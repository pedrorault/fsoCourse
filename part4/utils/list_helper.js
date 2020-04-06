const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum,blog) =>{
    return blog.likes + sum
  },0)
  return total
}
const favoriteBlog = (blogs) => {
  return blogs.reduce((result, obj) => {
    if(!result){
      result = obj
    }else{
      if(obj.likes >= result.likes){
        result = obj        
      }
    }
    return result
  },null)  
}
const mostBlogs = (blogs) => {
  const list  = blogs.reduce((total,obj)=>{
    let result = {author:obj.author, blogs: (blogs.filter(b=>b.author===obj.author).length)}
    total = (total.length === 0) 
      ? total.concat(result) 
      : (!total.find(b=>_.isEqual(b,result))) 
        ? total.concat(result) 
        : total
    
    return total
  },[])

  return _.chain(list).sortBy('blogs').last().value()
}
const mostLikes = (blogs) => {
  let result = blogs.reduce( (total,blog) => {
    let entry = {author:blog.author, likes:blog.likes}
    let index = _.findIndex(total,(aut)=>aut.author===blog.author)

    if(total.length === 0 || index == -1){
      return total.concat(entry)
    }
    total[index].likes += blog.likes
    return total
  },[])
  return _.chain(result).sortBy('likes').last().value()
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}