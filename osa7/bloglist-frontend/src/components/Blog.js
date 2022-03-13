import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const id = useParams().id

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const increaseLikes = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return <button onClick={() => deleteBlog(blog)}>remove</button>
    }
  }

  return (
    <div className="hiddenByDefaultBlogInfo">
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}
      <br />
      likes {blog.likes}
      <button onClick={() => increaseLikes(blog)}>like</button>
      <br />
      {blog.user.name}
      <br />
      {removeButton()}
    </div>
  )
}

export default Blog
