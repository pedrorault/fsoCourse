const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/users')
const helper = require('../utils/users_test')
const supertest = require('supertest')
const api = supertest(app)

const userList = [...helper.usersDefault]

beforeEach( async () => {
  await User.deleteMany({})  
  let list = []
  for(const user of userList){
    list = list.concat(await helper.hashUser(user))
  }
  const users = list.map(user => new User(user))
  const promiseArray = users.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('Initial data', () => {
  test('length', async () => {
    const resp = await api.get('/users')
    expect(resp.body.length).toBe(helper.usersDefault.length)
  })
})
describe('Adding users', () => {
  test('Adding new user', async () => {
    const user = {
      username:'lirav',
      name:'Lira Vel',
      password:'7yasdg11@'
    }
    await api.post('/users').send(user).expect(201)
  }) 
  test('Adding invalid user', async () => {
    const user = {
      username:'lv',
      name:'Lira Vel',
      password:'7@'
    }
    await api.post('/users').send(user).expect(400)
  })
  test('Adding already added user', async () => {
    const user = {
      username:'pedrorault',
      name:'Pedro',
      password:'sajdnuiann'
    }
    await api.post('/users').send(user).expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})