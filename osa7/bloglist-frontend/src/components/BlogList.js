import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const blogsToView = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogsToView.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
