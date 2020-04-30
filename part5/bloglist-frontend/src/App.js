import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)      
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with ', {username,password})
    try{
      const user = await loginService.login({username,password})
      setUser(user)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUsername('')
      setPassword('')      
    }catch(exception){
      console.log('ERROR! ', exception)
    }
  }

  const loginForm = () => {
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
          setUser(null)}}>Logout</button></p>
      )
    }
    
  }

  const blogList = () => {
    return(
      <div>
        <h2>blogs</h2>
        {blogs.map(blog=><Blog key = {blog.id} blog={ blog } />)}
      </div>
    )      
  }
  return (    
    <div>
      {loginForm()}
      {user != null ? blogList() : null}
    </div>
  )
}

export default App