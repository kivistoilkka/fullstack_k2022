import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    },
  },
})

export const { setBlogs, appendBlog, setBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlog = (blogObject, user) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(blogObject)
    dispatch(
      appendBlog({
        ...returnedBlog,
        user: { username: user.username, name: user.name },
      })
    )
  }
}

export const likeBlog = (blog, user) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(
      setBlog({
        ...likedBlog,
        user: { username: user.username, name: user.name },
      })
    )
  }
}

export default blogSlice.reducer
