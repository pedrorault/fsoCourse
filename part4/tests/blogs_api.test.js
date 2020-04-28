const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/users')
const helper = require('./test_helper')
const helperUser = require('../utils/users_test')
const api = supertest(app)

const authToken = async () => {
  const userDef = helperUser.usersDefault[0]
  const login = {username: userDef.username, password: userDef.password}
  const response =  await api.post('/login').send(login)
  const auth = 'bearer '.concat(response.body.token) 
  return auth
}

beforeEach(async () => {
  const user = await User.findOne({})
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog({...blog, user: user._id}))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  user.blogs = user.blogs.concat(blogObjects.map(blog => blog._id))
  await user.save()
})

describe('Authentication', () => {
  test('Not being authenticated results in 401', async () => {
    await api.post('/blogs').send(helper.initialBlogs[0]).expect(401)
  })
})

describe('blogs being returned as expected', () => {
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
})

describe('New Blog Tests', () => {
  test('Creating a new blog while not logged in', async () => {
    const blog = {
      title: 'NewContent',
      author: 'Pedro',
      url: 'http://',
      likes: 10
    }
    await api.post('/blogs').send(blog).expect(401)
  })

  test('Creating a new blog', async () => {
    const blog = {
      title: 'NewContent',
      author: 'Pedro',
      url: 'http://',
      likes: 10
    }
    await api.post('/blogs').set('Authorization', await authToken()).send(blog).expect(201).expect('Content-Type','application/json; charset=utf-8')
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
    const newBlog = await api.post('/blogs').set('Authorization', await authToken()).send(blog).expect(201)
    expect(newBlog.body.likes).toBe(0)  
    
  })
  test('Missing title and url gives 404', async () => {
    const blog = {
      author: 'Pedro',
    }
    await api.post('/blogs').set('Authorization', await authToken()).send(blog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})