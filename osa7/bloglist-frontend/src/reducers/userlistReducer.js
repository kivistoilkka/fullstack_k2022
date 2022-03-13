import { createSlice } from '@reduxjs/toolkit'
import userlistService from '../services/userlist'

const userlistSlice = createSlice({
  name: 'userlist',
  initialState: [],
  reducers: {
    setUserlist(state, action) {
      return action.payload
    },
    modifyUser(state, action) {
      const updatedUser = action.payload
      return state.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    },
  },
})

export const { setUserlist, modifyUser } = userlistSlice.actions

export const initializeUserlist = () => {
  return async (dispatch) => {
    const userlist = await userlistService.getAll()
    dispatch(setUserlist(userlist))
  }
}

export const addBlogToUserInState = (blog, user) => {
  return (dispatch) => {
    const blogToAdd = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
    }
    const updatedUser = {
      ...user,
      blogs: user.blogs.concat(blogToAdd),
    }
    dispatch(modifyUser(updatedUser))
  }
}

export const removeBlogFromUserInState = (blog) => {
  return (dispatch, getState) => {
    const userToUpdate = getState().userlist.find((u) => u.id === blog.user.id)
    const updatedUser = {
      ...userToUpdate,
      blogs: userToUpdate.blogs.filter((b) => b.id !== blog.id),
    }
    dispatch(modifyUser(updatedUser))
  }
}

export default userlistSlice.reducer
