const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Somebody',
    author: 'Pedro',
    url: 'http://',
    likes: 10
  },
  {
    title: 'once told me',
    author: 'Pedro',
    url: 'http://',
    likes: 100
  }
]

const nonExistingBlogId = async () => {
  const blog = new Blog({title:'Remove',author: 'Test',url:'http://',likes:0})
  await blog.save()
  await blog.remove()

  return blog.id
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { blogsInDb, nonExistingBlogId, initialBlogs }