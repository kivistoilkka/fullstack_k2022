import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calcAverage = () => {
    if (good+neutral+bad == 0) {
      return 0
    }
    return (good*1 + bad*(-1)) / (good+neutral+bad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      
      <h1>statistics</h1>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {good+neutral+bad}<br />
      average {calcAverage()}<br />
      positive {good/(good+neutral+bad)*100} %
    </div>
  )
}

export default App