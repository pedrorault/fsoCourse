import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'

const Login = ( setUser ) => {
  console.log(setUser)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with ', {username,password})
    try{
      const user = await loginService.login({username,password})
      setUser(user)
      setUsername('')
      setPassword('')      
    }catch(exception){
      console.log('ERROR! ', exception)
    }
  }
  return(
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <p>username: <input value={username} onChange={({target}) =>{setUsername(target.value)}}/></p>
        <p>password: <input type='password' value={password} onChange={({target})=>{setPassword(target.value)}}/></p>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
export default Login