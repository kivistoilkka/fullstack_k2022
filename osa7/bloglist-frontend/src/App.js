import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import { createNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { loginFromLocalStorage, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginFromLocalStorage(user))
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const addBlog = async (blogObject) => {
    const { title, author, url } = blogObject

    if (title === '' || author === '' || url === '') {
      dispatch(createNotification('Please fill all of the fields', 'alert', 5))
    } else {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject, user))
    }
  }

  const blogList = () => (
    <div>
      {blogsToView.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const blogsToView = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div id="blogs">
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogList()}
    </div>
  )
}

export default App
