import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const id = useParams().id

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

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
      <p>
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={() => increaseLikes(blog)}>like</button>
        <br />
        {blog.user.name}
        <br />
        {removeButton()}
      </p>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
