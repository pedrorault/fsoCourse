import React, { useState } from 'react';


const App = () => {
  const [persons,setPersons] = useState([ {name:'Arto Hellas', number:"11 99999-0000"} ])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')

  const onSubmitPhonebook = (event) =>{
    event.preventDefault()
    if(persons.find((person) => person.name === newName)){   
      window.alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name: newName,number: newNumber}))    
    }
    setNewName('')
    setNewNumber('')
  }
  const handleChangeName = (event) => setNewName(event.target.value)  
  const handleChangeNumber = (event) => setNewNumber(event.target.value)

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitPhonebook}>
        <div>name: <input value={newName} onChange={handleChangeName} /></div>        
        <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
        <div><button type="submit">Add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map((person,i)=>(<p key={i}>{person.name} {person.number}</p>))}</div>
    </div>    
  )
}

export default App
