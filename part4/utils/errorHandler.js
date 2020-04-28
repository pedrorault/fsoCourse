const logger = require('./logger')

const errorHandler = (error,request,response,next) => {
  //logger.error(error)
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return response.status(404).json({error:'id malformated'})
  }else if(error.name === 'TypeError'){
    return response.status(404).json({error:'id not found'})
  }else if (error.name === 'ValidationError'){
    return response.status(400).json({error:error.message})
  }else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'invalid token'
    })
  }
  next(error)
}

module.exports = errorHandler