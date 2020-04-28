const blogRouter = require('express').Router()
require('express-async-errors')
const jwt = require('jsonwebtoken')
const Blog  = require('../models/blog')
const User = require('../models/users')

blogRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs:0})
  response.json(blogs)
})

blogRouter.get('/:id',async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())  
})

blogRouter.post('/', async (request, response) => { 
  const decodedToken = jwt.verify(request.token,process.env.SECRET)

  if(!request.token || !decodedToken.id){
    return response.status(401).json({error:'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)
  const blog = {
    ...request.body,
    likes: request.body.likes || 0
  }
  if(!blog.title && !blog.url){
    return response.status(400).json({error: 'No title, No url'})
  }
  blog['user']= user.id  

  const savedBlog = await new Blog(blog).save()  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON()) 
})

blogRouter.delete('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  const creator = blog.user.toString()

  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  if(!request.token || !decodedToken.id){
    return response.status(401).json({error:'User not logged in'})
  }
  if(creator === decodedToken.id.toString()){
    await blog.remove()
    return response.status(204).end()
  }else{
    return response.status(401).json({error:'User does not own blog to delete it'})
  }
})

blogRouter.put('/:id', async (request, response) => {
  const reqBlog = request.body
  const blog = await Blog.findByIdAndUpdate(request.params.id, reqBlog, {new:true})
  response.status(201).json(blog.toJSON())
})

blogRouter.get('*', (request,response,next) => {
  const error = new Error()
  error.status = 404
  next(error)
})

module.exports = blogRouter