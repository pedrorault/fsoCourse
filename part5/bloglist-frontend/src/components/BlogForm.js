import React, { useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setBlogs, blogs, setAlertMsg}) => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const onChangeTitle  = ({target}) => setTitle(target.value)
  const onChangeAuthor = ({target}) => setAuthor(target.value)
  const onChangeUrl    = ({target}) => setUrl(target.value)

  const submitBlog = async (e) => {
    e.preventDefault()
    const resp = await blogService.create( {title, author, url} )
    if(resp){
      blogs = blogs.concat(resp)
      setBlogs(blogs)
      setAlertMsg({isError:false,message:`Added ${resp.title} by ${resp.author}`})
      setTimeout(()=>setAlertMsg({isError:false,message:""}),3000)  
      setTitle('')
      setAuthor('')
      setUrl('') 
    }else{
      setAlertMsg({isError:true,message:`Couldn't add blog`})
      setTimeout(()=>setAlertMsg({isError:false,message:""}),3000)   
    }
  }

  return(
    <div>
      <h2>create new blog</h2>
      <form>
        <p>title: 
          <input name='title'value={title}
            onChange={onChangeTitle} />
        </p>
        <p>author: 
          <input value={author}
            onChange={onChangeAuthor} />
        </p>
        <p>url: 
          <input value={url} 
            onChange={onChangeUrl}/>
        </p>
        <button onClick={submitBlog}>Create</button>
      </form>
    </div>
  )
  
}

export default BlogForm