import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const blogsToView = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    const { title, author, url } = blogObject

    if (title === '' || author === '' || url === '') {
      dispatch(
        createNotification('Please fill all of the fields', 'warning', 5)
      )
    } else {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
    }
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <Table striped>
        <tbody>
          {blogsToView.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
              <td>Likes: {blog.likes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
