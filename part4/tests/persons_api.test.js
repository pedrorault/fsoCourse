const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async ()=>{
  await api
    .get('/blogs')
    .expect(200)
    .expect('Content-Type','application/json; charset=utf-8')

})
test('there are two blogs', async () => {
  const response = await api.get('/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the first blog is Something', async () => {
  const response = await api.get('/blogs')
  expect(response.body[0].title).toBe(helper.initialBlogs[0].title)
})


test('the unique identifier of blog is id', async () => {
  const response = await api.get('/blogs')
  const blog = response.body[0]
  expect(blog.id).toBeDefined()
})

describe('New Blog Tests', () => {
  test('Creating a new blog', async () => {
    const blog = {
      title: 'NewContent',
      author: 'Pedro',
      url: 'http://',
      likes: 10
    }
    await api.post('/blogs').send(blog).expect(201).expect('Content-Type','application/json; charset=utf-8')
    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length +1)
  
    const content = blogAtEnd.map(blog=>blog.title)
    expect(content).toContain(blog.title)
  })
  test('Missing like property gives 0 likes', async () => {
    const blog = {
      title: 'NewContent',
      author: 'Pedro',
      url: 'http://'
    }
    const newBlog = await api.post('/blogs').send(blog).expect(201)
    expect(newBlog.body.likes).toBe(0)  
    
  })
  test.only('Missing title and url gives 404', async () => {
    const blog = {
      author: 'Pedro',
    }
    await api.post('/blogs').send(blog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})