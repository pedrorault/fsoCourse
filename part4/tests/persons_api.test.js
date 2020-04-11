const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
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
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is Something', async () => {
  const response = await api.get('/blogs')
  expect(response.body[0].title).toBe(initialBlogs[0].title)
})
afterAll(() => {
  mongoose.connection.close()
})