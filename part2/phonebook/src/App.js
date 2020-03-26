import React, { useState } from 'react';


const App = () => {
  const [persons,setPersons] = useState( ['Arto Hellas'])
  const [newName,setNewName] = useState('')

  const onSubmitPhonebook = (event) =>{
    event.preventDefault()
    setPersons(persons.concat(newName))    
    setNewName('')
  }
  const handleChangePhonebook = (event) => {
    setNewName(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitPhonebook}>
        <div>
          name: <input value={newName} onChange={handleChangePhonebook} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>{persons.map((person,i)=>(<p key={i}>{person}</p>))}</div>
    </div>    
  )
}

export default App
