import React from 'react'
import contactService from '../services/contacts'

const Results = ({persons,setPersons,searchPersonField,setAlertMsg}) => {
    const onDelete = (name,id) => {
      if(window.confirm(`Tem certeza que deseja deletar ${name} da lista?`)){
        contactService.deleteContact(id).then(()=>{
          setPersons(persons.filter((person) => person.id !== id)) 
          setAlertMsg({isError:false,message:`Deleted ${name}`})
          setTimeout(()=>setAlertMsg({isError:false,message:""}),3000)
        })
        .catch(e=>{
          setAlertMsg({isError:true,message:`${e}`})
          setTimeout(()=>setAlertMsg({isError:false,message:""}),3000)
        })
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
                    <p key={i}>{result.name} {result.number}<button>Delete</button></p>
                )
              )}
      </div>
      )
    }  
  }

export default Results