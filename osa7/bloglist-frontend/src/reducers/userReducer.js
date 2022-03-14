import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { createNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginFromLocalStorage = (user) => {
  return (dispatch) => {
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(createNotification(`Welcome ${user.name}!`, 'success', 5))
    } catch (exception) {
      dispatch(createNotification('Wrong username or password', 'warning', 5))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
    blogService.setToken(null)
    dispatch(createNotification('You have logged out, good bye!', 'success', 5))
  }
}

export default userSlice.reducer
