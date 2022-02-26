import React, { useState } from 'react'

const Blog = ({ blog, increaseLikes, deleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const removeButton = () => {
    if (blog.user.name === user.name) {
      return <button onClick={() => deleteBlog(blog.id)}>remove</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(false)}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes}
        <button onClick={() => increaseLikes(blog.id)}>like</button><br />
        {blog.user.name}<br />
        {removeButton()}
      </div>

    </div>
  )  
}

export default Blog