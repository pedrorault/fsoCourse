import React, { useState, useEffect} from 'react'
import blogService from '../services/blogs'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogViewer = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({isError:false,message:''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return(
    <div>
      <Notification {...notification} />
      <BlogForm setBlogs={setBlogs} blogs={blogs} setAlertMsg={setNotification}/>
      <BlogList blogs={blogs}/>
    </div>
  )

}

export default BlogViewer