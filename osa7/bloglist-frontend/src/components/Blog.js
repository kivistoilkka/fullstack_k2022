import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, increaseLikes, deleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return <button onClick={() => deleteBlog(blog.id)}>remove</button>
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
  increaseLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
