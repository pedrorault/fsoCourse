import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdotes,selected,votes,text}) =>{
  return(
    <div>
      <h1>{text}</h1>
      <p style={{height:25+'px'}}>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const MostVoted = (props) =>{
  const arr = props.anecdoteProp.votes
  const indexMostVoted = arr.indexOf(Math.max(...arr))
  if(indexMostVoted === 0){
    return(<></>)
  }
  return(
    <div>
    <Anecdote {...props.anecdoteProp} selected={indexMostVoted} text ={"Anecdote with most votes"}/>
    </div>
  )
}

const randomSelectIndexAnecdote = (selected) => {
  const ifSelected = (selected === undefined) ? -1 : selected;
  let random;
    do{
      random = Math.floor(Math.random()*10);
    }while(random > (anecdotes.length-1) || random === ifSelected )
    return random  
}

const onClickVote = (selected, votes, setVotes) => {
  const newVote = [...votes]; 
  newVote[selected]+=1; 
  setVotes(newVote);
}

const App = (props) => {
  const [selected, setSelected] = useState(randomSelectIndexAnecdote)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const anecdoteProp = {anecdotes:props.anecdotes, votes:votes, selected:selected}
  return (
    <div>
      <Anecdote {...anecdoteProp} text={"Anecdote of the day"}/>
      <Button text="vote" onClick={() => onClickVote(selected,votes,setVotes)} />
      <Button text="next anedocte" onClick={()=>setSelected(randomSelectIndexAnecdote(selected))} />
      <MostVoted anecdoteProp={anecdoteProp} />
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