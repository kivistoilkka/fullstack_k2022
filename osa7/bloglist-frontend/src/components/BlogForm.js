import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
            placeholder="write here blog title"
          />
        </div>

        <div>
          author:
          <input
            id="author"
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            placeholder="write here blog author"
          />
        </div>

        <div>
          url:
          <input
            id="url"
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
            placeholder="write here blog url"
          />
        </div>

        <button id="submit-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
