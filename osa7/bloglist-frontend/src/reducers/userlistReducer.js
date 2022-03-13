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

export const addBlogToUserInState = (user, blog) => {
  return (dispatch, getState) => {
    const userToUpdate = getState().userlist.find((u) => u.id === blog.user)
    const updatedUser = {
      ...userToUpdate,
      blogs: userToUpdate.blogs.concat(blog),
    }
    dispatch(modifyUser(updatedUser))
  }
}

export default userlistSlice.reducer
