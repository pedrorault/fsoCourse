import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [user,setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  
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
      <Login handleSetUser={(x)=> setUser(x)} user={user}/>
      {user != null ? <BlogForm /> : null}
      {user != null ? blogList() : null}
    </div>
  )
}

export default App