import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const comment = useField('text')

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

  const handleCommenting = (event) => {
    event.preventDefault()
    dispatch(commentBlog(comment.value, blog))
    comment.onReset()
  }

  return (
    <div>
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
      <form onSubmit={handleCommenting}>
        <input {...comment} />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
