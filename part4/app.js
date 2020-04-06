const blogRouter = require('./controllers/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const errorHandler = require('./utils/errorHandler')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/blogs',blogRouter)
//app.use('/',blogRouter)

const mongoUrl = config.MONGODB_URI
logger.info(`Connecting to url: ${mongoUrl}`)
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error(error))

app.use(errorHandler)

module.exports =  app 