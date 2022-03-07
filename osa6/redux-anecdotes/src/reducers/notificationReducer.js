import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const getId = () => (100000 * Math.random()).toFixed(0)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(store, action) {
      return action.payload
    },
    clearNotification(store, action) {
      if (store.id === action.payload) {
        return null
      }
      return store
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return dispatch => {
    const id = getId()
    dispatch(showNotification({ id, message }))
    setTimeout(() => {
      dispatch(clearNotification(id))
    }, seconds  * 1000)
  }
}

export default notificationSlice.reducer