import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
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
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
      const returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      notify(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
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
          <Notification notification={notification} />
          {loginForm()}
        </div>
      )
    }

    return (
      <div id="blogs">
        <h2>blogs</h2>
        <Notification notification={notification} />
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
