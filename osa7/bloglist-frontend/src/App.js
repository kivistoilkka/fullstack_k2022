import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { createNotification } from './reducers/notificationReducer'
import { setBlogs, createBlog, initializeBlogs } from './reducers/blogReducer'

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

  const notify = (message, type = 'info') => {
    dispatch(createNotification(message, type, 5))
  }

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
      notify('Wrong username or password', 'alert')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    notify('You have logged out, good bye!')
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
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject, user))
      notify(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exception) {
      notify('Please fill all of the fields', 'alert')
    }
  }

  const increaseLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const user = blog.user
    const changedBlog = { ...blog, user: user.id, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      const newBlogs = blogs
        .map((blog) =>
          blog.id !== id ? blog : { ...returnedBlog, user: user }
        )
        .sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    } catch (exception) {
      notify('Blog was already removed from server', 'alert')
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((b) => b.id !== id))
        notify(`Blog ${blog.title} by ${blog.author} removed`)
      } catch (expection) {
        notify('only the creator can delete a blog', 'alert')
      }
    }
  }

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
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

  const conditionalView = () => {
    if (user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          {loginForm()}
        </div>
      )
    }

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

  return <div>{conditionalView()}</div>
}

export default App
