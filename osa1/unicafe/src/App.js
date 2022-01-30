import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const calcAverage = () => {
    if (good+neutral+bad == 0) {
      return 0
    }
    return (good*1 + bad*(-1)) / (good+neutral+bad)
  }

  const calcPositivePercent = () => {
    if (good+neutral+bad == 0) {
      return 0
    }
    return good/(good+neutral+bad)*100
  }

  return (
    <div>
      <h1>statistics</h1>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {good+neutral+bad}<br />
      average {calcAverage()}<br />
      positive {calcPositivePercent()} %
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App