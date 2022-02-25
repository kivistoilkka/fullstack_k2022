import React, { useState } from 'react'

const Blog = ({blog}) => {
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
        <button>like</button><br />
        {blog.user.name}<br />
      </div>

    </div>
  )  
}

export default Blog