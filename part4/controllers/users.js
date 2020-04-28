const userRouter = require('express').Router()
require('express-async-errors')
const User = require('../models/users')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request,response) =>{
  const users = await User.find({}).populate('blogs', {url:1, author:1, title:1})
  response.json(users)
})
userRouter.get('/:id', async (request,response)=> {
  const user = await User.findById(request.params.id)
  response.status(200).json(user)
})
userRouter.post('/', async (request,response) => {
  if(request.body.username.length < 3 || request.body.password.length < 3){
    return response.status(400).json({error:'Username and Password must be at least 3 characters long.'})
  }
  const user = {
    username:request.body.username,
    name:request.body.name
  }
  const saltRounds = 10
  user['passwordHash'] = await bcrypt.hash(request.body.password, saltRounds)

  const saved = await new User(user).save()
  response.status(201).json(saved)  
})
// username, name, passwordHash
module.exports = userRouter