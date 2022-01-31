import { useState } from 'react'

const AnecdoteDisplay = ({ anecdote, votes }) => (
  <div>
      {anecdote}<br />
      has {votes} votes
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const voteHandler = () => {
    const newVote = votes[selected] + 1
    const votesCopy = [...votes]
    votesCopy[selected] = newVote
    if (newVote >= votes[mostVoted]) {
      setMostVoted(selected)
    }
    setVotes(votesCopy)
  }
  const nextHandler = () => setSelected(getRandomInt(anecdotes.length))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={voteHandler} text='vote' />
      <Button handleClick={nextHandler} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <AnecdoteDisplay anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App