import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(store, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

let timeoutId = null

export const createNotification = (message, type, seconds) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(setNotification(null))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
