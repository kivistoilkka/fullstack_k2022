import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Userlist from './components/Userlist'
import User from './components/User'
import Blog from './components/Blog'

import { initializeBlogs } from './reducers/blogReducer'
import { loginFromLocalStorage, logout } from './reducers/userReducer'
import { initializeUserlist } from './reducers/userlistReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUserlist())
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div id="blogs">
      <div style={{ background: 'lightgrey', padding: 5 }}>
        <Link style={{ padding: 5 }} to="/">
          blogs
        </Link>
        <Link style={{ padding: 5 }} to="/users">
          users
        </Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs" element={<Navigate replace to="/" />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Userlist />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
