import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/LoginForm'
import BlogViewer from './components/BlogViewer'

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
      <Login handleSetUser={setUser} user={user}/>
      {user != null ? <BlogViewer /> : null}
    </div>
  )
}

export default App