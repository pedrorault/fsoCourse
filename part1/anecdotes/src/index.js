import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const App = (props) => {
  const rand = (selected) => {
    let random;
    do{
      random = parseInt(Math.random()*10);
    }while(random > (anecdotes.length-1) || random === selected)
    return random
  }
  const [selected, setSelected] = useState(rand)
  const [votes, setVotes] = useState(Array(6).fill(0))


  
  return (
    <div>
      <p style={{height:25+'px'}}>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button text="vote" onClick={() => {const newVote = [...votes]; newVote[selected]+=1; setVotes(newVote)}} />
      <Button text="next anedocte" onClick={()=>setSelected(rand)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)