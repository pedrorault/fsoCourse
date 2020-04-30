import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'


const Login = ( {handleSetUser, user} ) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with ', {username,password})
    try{
      const user = await loginService.login({username,password})
      handleSetUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUsername('')
      setPassword('')      
    }catch(exception){
      console.log('ERROR! ', exception)
    }
  }
  
  if(user == null){
    return (
      <div>
        <form onSubmit={handleLogin}>
          <p>username: <input value={username} onChange={({target}) => {setUsername(target.value)}}/></p>
          <p>password: <input type='password' value={password} onChange={({target})=>{setPassword(target.value)}}/></p>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }else{
    return(
      <p>{user.name} logged in <button onClick={()=>{
        window.localStorage.removeItem('loggedUser',JSON.stringify(user))          
        handleSetUser(null)}}>Logout</button></p>
    )
  }


}
export default Login