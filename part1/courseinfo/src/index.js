import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return(
        <h1>{props.course}</h1>
    )
}
const Part = (props) => {
    return (
        <p>{props.parte.name} {props.parte.exercises}</p>
    )
}
const Content = (props) => {
    return(
        <>
        <Part parte= {props.partes.parte1} />
        <Part parte= {props.partes.parte2} />
        <Part parte= {props.partes.parte3} />
        </>
    )
}
const Total = (props) => {
    return(
        <p>Number of exercises {props.total}</p>
    )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = exercises1+exercises2+exercises3
  
  const allparts = {
    parte1:{name:part1, exercises:exercises1},
    parte2:{name:part2, exercises:exercises2},
    parte3:{name:part3, exercises:exercises3},      
  }
  return (
    <div>
        <Header  course={course}   />
        <Content partes={allparts} />
        <Total   total={total}     />     
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))