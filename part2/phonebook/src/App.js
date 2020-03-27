import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Form = ({newName,newNumber,handleChangeName,handleChangeNumber, onSubmitPhonebook}) => {
  return (
    <div>
      <h3>add a new</h3>
      <form onSubmit={onSubmitPhonebook}>
        <div>name: <input value={newName} onChange={handleChangeName} /></div>        
        <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
        <div><button type="submit">Add</button></div>
      </form>
    </div>
  )
}

const SearchInput = ({searchPersonField,handleSearch}) => {
  return ( 
    <div>filter shown with <input value={searchPersonField} onChange={handleSearch} /></div>
  )
}

const Results = ({persons,searchPersonField}) => {
  if(searchPersonField === ''){    
    return(
      <div>
        {persons.map((person) =><p key={person.id}>{person.name} {person.number} </p>)}
      </div>
    )
  }else{
    return (
    <div>
      {persons.filter( (person) => person.name.toLowerCase().includes(searchPersonField.toLowerCase())).map( (result,i) => <p key={i}>{result.name} {result.number}</p>)}
    </div>
    )
  }  
}
const App = () => {
  const [persons,setPersons] = useState([])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [searchPersonField,setSearchField] = useState('')
  
  const url = "http://localhost:3001/persons"
  
  useEffect(()=>{
    console.log("Effect in action!!");
    axios.get(url).then(response=>setPersons(response.data))
    
  }, [])

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
  const handleSearch = (event) => setSearchField(event.target.value)   
  
  const propsObj = {
    formProps: {newName,newNumber,handleChangeName,handleChangeNumber, onSubmitPhonebook},
    searchProps: {searchPersonField,handleSearch},
    resultsProps: {persons,searchPersonField}
  }
  
  return(
    <div>
      <h2>Phonebook</h2>
      <SearchInput {...propsObj.searchProps}/>
      <Form {...propsObj.formProps} />
      <h2>Numbers</h2>
      <Results {...propsObj.resultsProps}/> 
    </div>    
  )
}

export default App
