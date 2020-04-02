import React, { useState, useEffect} from 'react';
import contactService from './services/contacts'
import Form from './components/Form'
import Notification from "./components/Notification"
import Results from "./components/Results"
import SearchInput from "./components/SearchInput"

const App = () => {
  const [persons,setPersons] = useState([])  
  const [searchPersonField,setSearchField] = useState('')
  const [alertMsg, setAlertMsg] = useState({isError:false,message:""})
  
  useEffect(()=>{contactService.getAllContacts().then(v => setPersons(v))}, [])
   
  const handleSearch = (event) => setSearchField(event.target.value)   
  
  const propsObj = {
    formProps: {persons,setPersons,setAlertMsg},
    searchProps: {searchPersonField,handleSearch},
    resultsProps: {persons,setPersons,searchPersonField,setAlertMsg}
  }
  
  return(
    <div>
      <h2>Phonebook</h2>
      <Notification {...alertMsg} />
      <SearchInput {...propsObj.searchProps}/>
      <Form {...propsObj.formProps} />
      <h2>Numbers</h2>
      <Results {...propsObj.resultsProps}/> 
    </div>    
  )
}

export default App
