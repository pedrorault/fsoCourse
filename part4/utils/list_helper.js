const _ = require('lodash')

const blogs = [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
}, {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}, {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
}, {
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
}, {
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0
}, {
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}
]

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
  mostLikes,
  blogs
}