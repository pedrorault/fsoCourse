import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

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
      blogService.setToken(user.token)
    }
  },[])

  const handleSetUser = user => setUser(user)

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
          handleSetUser(null)}}>Logout</button></p>
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
  const createBlog = () => {
    const submitBlog = (e) => {
      e.preventDefault()
      blogService.create( {title, author, url} )

    }
    return(
      <div>
        <h2>create new blog</h2>
        <form>
          <p>title: 
            <input value={title}
              onChange={({target})=>setTitle(target.value)} />
          </p>
          <p>author: 
            <input value={author}
              onChange={({target})=>setAuthor(target.value)} />
          </p>
          <p>url: 
            <input value={url} 
              onChange={({target})=>setUrl(target.value)}/>
          </p>
          <button onClick={submitBlog}>Create</button>
        </form>
      </div>
    )
  }
  return (    
    <div>
      <Login props={handleSetUser}/>
      {loginForm()}
      {user != null ? createBlog() : null}
      {user != null ? blogList() : null}
    </div>
  )
}

export default App