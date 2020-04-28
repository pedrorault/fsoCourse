const mongoose = require('mongoose')
const supertest = require('supertest')
const users = require('../utils/users_test')
const app = require('../app')
const api = supertest(app)
//

test('Login failed', async () => {
  const infologin = {username: users.usersDefault[0].username, password: 'gibberish' }
  await api.post('/login').send(infologin).expect(401)
})
test('Login success', async () => {
  const infologin = {username: users.usersDefault[0].username, password: users.usersDefault[0].password }
  await api.post('/login').send(infologin).expect(200)
})
afterAll( () => {
  mongoose.connection.close()
})