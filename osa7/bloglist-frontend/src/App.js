import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { createNotification } from './reducers/notificationReducer'
import {
  createBlog,
  initializeBlogs,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('Wrong username or password', 'alert', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    dispatch(createNotification('You have logged out, good bye!', 'info', 5))
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )

  const addBlog = async (blogObject) => {
    const { title, author, url } = blogObject

    if (title === '' || author === '' || url === '') {
      dispatch(createNotification('Please fill all of the fields', 'alert', 5))
    } else {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject, user))
      dispatch(
        createNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} added`,
          'info',
          5
        )
      )
    }
  }

  const increaseLikes = async (blog) => {
    dispatch(likeBlog(blog, user))
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog))
        dispatch(
          createNotification(
            `Blog ${blog.title} by ${blog.author} removed`,
            'info',
            5
          )
        )
      } catch (expection) {
        dispatch(
          createNotification('only the creator can delete a blog', 'alert', 5)
        )
      }
    }
  }

  const blogList = () => (
    <div>
      {blogsToView.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikes={increaseLikes}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
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
