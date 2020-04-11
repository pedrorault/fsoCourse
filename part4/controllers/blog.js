const blogRouter = require('express').Router()
require('express-async-errors')
const Blog  = require('../models/blog')

blogRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id',async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())  
})

blogRouter.post('/', async (request, response) => {
  const blog = {
    ...request.body,
    likes: request.body.likes || 0
  }
  if(!blog.title && !blog.url){
    return response.status(400).json({error: 'No title, No url'})
  }  
  const savedBlog = await new Blog(blog).save()  
  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  await blog.remove()
  response.status(204).end()
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