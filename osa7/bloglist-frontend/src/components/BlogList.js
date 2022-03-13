import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const blogsToView = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

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
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
