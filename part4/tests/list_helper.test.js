const listHelper = require('../utils/list_helper')
const blogs = listHelper.blogs

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)

  expect(result).toBe(1)
})

describe('Total Likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    expect(listHelper.totalLikes(blogs)).toBe(0)
  })
  test('when list has only one blog equals the like of that', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(blogs[0].likes)
  }) 
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('Blogs', () => {
  describe('Favorite blog',() => {
    test('when there is no blog', () => {
      expect(listHelper.favoriteBlog([])).toBeNull()
    })
    test('when there is one blog only', () => {
      expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0])
    })
    test('when there are more than one blog', () => {
      expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
    }) 
  })   
  test('Most blogs per author', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({author:'Robert C. Martin', blogs:3})
  })
  test('Most Likes per author', ()=>{
    expect(listHelper.mostLikes(blogs)).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
  })
})


