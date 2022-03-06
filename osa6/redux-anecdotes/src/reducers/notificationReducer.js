import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Initial notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {}
})

export default notificationSlice.reducer