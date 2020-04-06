const blogRouter = require('express').Router()
require('express-async-errors')
const Blog  = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id',async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())  
})

blogRouter.post('/', async (request, response) => {
  const blog = await new Blog(request.body)
  response.status(201).json(blog)  
})
blogRouter.get('*', (request,response,next) => {
  const error = new Error()
  error.status = 404
  next(error)
})
module.exports = blogRouter