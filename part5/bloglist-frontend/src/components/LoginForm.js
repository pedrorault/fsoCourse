import React from 'react'
import { useState } from 'react'
import Notification from '../components/Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'



const Login = ( {handleSetUser, user} ) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [notification, setNotification] = useState({isError:false,message:''})


  const onChangeUsername = ({target}) => setUsername(target.value)
  const onChangePassword = ({target}) => setPassword(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      handleSetUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUsername('')
      setPassword('')      
    }catch(exception){
      setNotification({isError:true,message:`Couldn't log in, wrong username or password`})
      setTimeout(()=>setNotification({isError:false,message:""}),3000)  
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser',JSON.stringify(user))          
    handleSetUser(null)
  }
  
  if(user == null){
    return (
      <div>
        <Notification {...notification}/>
        <form onSubmit={handleLogin}>
          <p>username: <input value={username} onChange={onChangeUsername}/></p>
          <p>password: <input type='password' value={password} onChange={onChangePassword}/></p>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }else{
    return(
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
    )
  }


}
export default Login