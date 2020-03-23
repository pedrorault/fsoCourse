import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>give feedback</h1>;
const Button = ({onClick,text}) => 
(<button onClick={onClick}>{text}</button>)

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  if(total === 0){
    return (<div><h1>statistics</h1><p>No feedback given</p></div>)
  }
  const avg = (good-bad)/total 
  const positive = (good/total)*100 
  return(
    <div>
      <h1>statistics</h1>
      <table><tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="total" value={total} />
        <Statistic text="average" value={avg} />
        <Statistic text="positive" value={positive+'%'} />
        </tbody></table>
    </div>
  )
}

const Statistic = ({text,value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const feedback = {
    good:good,
    neutral:neutral,
    bad:bad
  };
  return (
    <div>
      <Header />
      <Button onClick={() => setGood(good+1)} text="good" />
      <Button onClick={() => setNeutral(neutral+1)} text="neutral" />   
      <Button onClick={() => setBad(bad+1)} text="bad" />  
      <Statistics {...feedback} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)