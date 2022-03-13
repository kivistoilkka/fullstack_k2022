import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { createNotification } from './notificationReducer'
import {
  addBlogToUserInState,
  removeBlogFromUserInState,
} from './userlistReducer'

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
    filterBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, setBlog, filterBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch, getState) => {
    const returnedBlog = await blogService.create(blogObject)
    const user = getState().userlist.find((u) => u.id === returnedBlog.user)
    dispatch(
      appendBlog({
        ...returnedBlog,
        user: {
          username: user.username,
          name: user.name,
          id: returnedBlog.user,
        },
      })
    )
    dispatch(addBlogToUserInState(returnedBlog, user))
    dispatch(
      createNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'info',
        5
      )
    )
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(
      setBlog({
        ...likedBlog,
        user: {
          username: blog.user.username,
          name: blog.user.name,
          id: likedBlog.user,
        },
      })
    )
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(filterBlog(blog.id))
      dispatch(removeBlogFromUserInState(blog))
      dispatch(
        createNotification(
          `Blog ${blog.title} by ${blog.author} removed`,
          'info',
          5
        )
      )
    } catch (expection) {
      dispatch(
        createNotification('only the creator can delete a blog', 'alert', 5)
      )
    }
  }
}

export default blogSlice.reducer
