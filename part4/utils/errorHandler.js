const logger = require('./logger')

const errorHandler = (error,request,response,next) => {
  //logger.error(error)
  if(error.name === 'CastError'){
    return response.status(404).json({error:'id malformated'})
  }else if(error.name === 'TypeError'){
    return response.status(404).json({error:'id not found'})
  }
  next(error)
}

module.exports = errorHandler