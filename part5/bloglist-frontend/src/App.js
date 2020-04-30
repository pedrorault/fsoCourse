import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [user,setUser] = useState(null)  

  useEffect(()=>{
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)  
      blogService.setToken(user.token)
    }
  },[])

  
  return (    
    <div>
      <Login handleSetUser={(x)=> setUser(x)} user={user}/>
      {user != null ? <BlogForm /> : null}
      {user != null ? <BlogList /> : null}
    </div>
  )
}

export default App