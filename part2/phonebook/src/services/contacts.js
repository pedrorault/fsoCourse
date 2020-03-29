import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAllContacts = () =>{
    return axios.get(baseUrl).then(response=>response.data)    
}
const addNewContact = (person) => {
    return axios.post(`${baseUrl}`,person).then(response => response.data)
}
const updateContact = (person) => {
    return axios.put(`${baseUrl}/${person.id}`,person)
}
const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAllContacts,addNewContact,updateContact,deleteContact}