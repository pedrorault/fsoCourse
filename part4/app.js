const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
const logger = require('./utils/logger')
const errorHandler = require('./utils/errorHandler')
const tokenHandler = require('./utils/tokenHandler')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(tokenHandler)
app.use('/blogs',blogRouter)
app.use('/users',userRouter)
app.use('/login',loginRouter)

const mongoUrl = config.MONGODB_URI
logger.info(`Connecting to url: ${mongoUrl}`)
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error(error))

app.use(errorHandler)

module.exports =  app 