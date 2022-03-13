import { createSlice } from '@reduxjs/toolkit'
import userlistService from '../services/userlist'

const userlistSlice = createSlice({
  name: 'userlist',
  initialState: [],
  reducers: {
    setUserlist(state, action) {
      return action.payload
    },
  },
})

export const { setUserlist } = userlistSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const userlist = await userlistService.getAll()
    dispatch(setUserlist(userlist))
  }
}

export default userlistSlice.reducer
