import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = await anecdoteService
      .update(id, {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      })
    const updatedList = anecdotes
      .map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    dispatch(setAnecdotes(updatedList))
  }
}

export default anecdoteSlice.reducer