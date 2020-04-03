import React, { useState} from 'react';
import contactService from '../services/contacts'

const Form = ({persons,setPersons,setAlertMsg}) => {
    const [newName,setNewName] = useState('')
    const [newNumber,setNewNumber] = useState('')
  
    const handleChangeName = (event) => setNewName(event.target.value)  
    const handleChangeNumber = (event) => setNewNumber(event.target.value) 
  
    const onSubmitPhonebook = (event) =>{
      event.preventDefault()
      const person = persons.find((person) => person.name === newName)
      if(person !== undefined){ 
        const confirm = window.confirm(`${person.name} is already on the list, replace old number with a new one?`)
        if(confirm){
          contactService.updateContact({...person,number:newNumber}).then(()=>{
            setPersons(persons.map(per=>(per.id===person.id)?{...per,number:newNumber}:per)) 

            setAlertMsg({isError:false,message:`Updated ${newName}`})
            setTimeout(()=>setAlertMsg({isError:false,message:""}),3000)        
            setNewName('')
            setNewNumber('')

          })
          .catch(error => {
            const msg =  error.response.data.error || error.response.data.message 
            setAlertMsg({isError:true,message:`${msg}`})
            setTimeout(()=>setAlertMsg({isError:false,message:""}),5000)
          })
        }      
      }else{
        contactService.addNewContact({name: newName.trim(), number:newNumber.trim()})
          .then(v=>{
            setPersons(persons.concat(v))
            setAlertMsg({isError:false,message:`Added ${newName}`})
            setTimeout(()=>setAlertMsg({isError:false,message:""}),3000)
            setNewName('')
            setNewNumber('')
          })   
          .catch(error=>{
            const msg = error.response.data.message || error.response.data.error
            setAlertMsg({isError:true,message:`${msg}`})
            setTimeout(()=>setAlertMsg({isError:false,message:""}),5000)
          })
      }
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

  export default Form