import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const increaseLikes = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return <button onClick={() => deleteBlog(blog)}>remove</button>
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="visibleByDefaultBlogInfo">
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className="hiddenByDefaultBlogInfo">
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={() => increaseLikes(blog)}>like</button>
        <br />
        {blog.user.name}
        <br />
        {removeButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
