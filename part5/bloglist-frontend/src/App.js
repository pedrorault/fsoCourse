import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)

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
      <Login handleSetUser={(x)=> setUser(x)} user={user}/>
      {user != null ? createBlog() : null}
      {user != null ? blogList() : null}
    </div>
  )
}

export default App