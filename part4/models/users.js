const mongoose = require('mongoose')
const uniqueVal = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform:(document, returnedObj) => {
    returnedObj.id = document._id.toString()
    delete returnedObj.passwordHash
    delete returnedObj._id
    delete returnedObj.__v
  }
})
mongoose.plugin(uniqueVal)

const User = mongoose.model('User',userSchema)
module.exports = User