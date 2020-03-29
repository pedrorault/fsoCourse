import React, { useState, useEffect} from 'react';
import contactService from './services/contacts'

const Form = ({persons,setPersons}) => {
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')

  const handleChangeName = (event) => setNewName(event.target.value)  
  const handleChangeNumber = (event) => setNewNumber(event.target.value) 

  const onSubmitPhonebook = (event) =>{
    event.preventDefault()
    if(newName === '' || newNumber === ''){ return alert("One or more fields empty") }

    const person = persons.find((person) => person.name === newName)
    if(person !== undefined){ 
      if(window.confirm(`${person.name} is already on the list, replace old number with a new one?`)){
        contactService.updateContact({...person,number:newNumber}).then(
          setPersons(persons.map(per=>{
            if(per.id ===  person.id){
              return {...per,number:newNumber}
            }else{
              return per
            }
          }))         
        )
      }      
    }else{
      contactService.addNewContact({name: newName, number:newNumber,id:Math.random})
        .then(v=>setPersons(persons.concat(v)))   
        .catch(e=>console.log(e))
    }
    setNewName('')
    setNewNumber('')
  }
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

const Results = ({persons,setPersons,searchPersonField}) => {
  const onDelete = (name,id) => {
    if(window.confirm(`Tem certeza que deseja deletar ${name} da lista?`)){
      contactService.deleteContact(id).then(()=>{
        setPersons(persons.filter((person) => person.id !== id))        
      })
      .catch(e=>alert(e))
    }
  }

  if(searchPersonField === ''){    
    return(
      <div>
        {persons.map((person,i) => (
          <p key={i}>{person.name} {person.number} 
            <button onClick={() => onDelete(person.name,person.id)}>Delete</button> 
          </p>
        )
        )}
      </div>
    )
  }else{
    return (
    <div>
      {persons.filter( (person) => 
          person.name.toLowerCase().includes(
            searchPersonField.toLowerCase())).map( 
              (result,i) => (
                  <p key={i}>{result.name} {result.number} <button>Delete</button></p>
              )
            )}
    </div>
    )
  }  
}
const App = () => {
  const [persons,setPersons] = useState([])  
  const [searchPersonField,setSearchField] = useState('')
  
  useEffect(()=>{
    contactService.getAllContacts().then(v => setPersons(v))   
  }, [])

   
  const handleSearch = (event) => setSearchField(event.target.value)   
  
  const propsObj = {
    formProps: {persons,setPersons},
    searchProps: {searchPersonField,handleSearch},
    resultsProps: {persons,setPersons,searchPersonField}
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
