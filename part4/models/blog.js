const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON',{
  transform:(document,returnedObj) => {
    returnedObj.id = document._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})
  
const Blog = mongoose.model('Blog', blogSchema)

module.exports =  Blog 