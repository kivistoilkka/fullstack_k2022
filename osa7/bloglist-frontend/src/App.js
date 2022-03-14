import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'
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
    <div id="blogs" className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#">
          <h2>blog app</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Text>
              <Link style={{ paddingRight: 10 }} to="/">
                blogs
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link style={{ paddingRight: 10 }} to="/users">
                users
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              {user.name} logged in
              <Button variant="primary" onClick={handleLogout}>
                logout
              </Button>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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
