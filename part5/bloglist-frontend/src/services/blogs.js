import axios from 'axios'
const baseUrl = '/blogs' // not /api/blogs on mine

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  // token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlZHJvcmF1bHQiLCJpZCI6IjVlOTVmMTE0NTNhNDM0MjAwMDhlOTIwNyIsImlhdCI6MTU4NjkwNDg5Mn0._V3XLocKukaC35u9oLWFm6bt4uf43RIyHpy67ZEYiy4'
  console.log(token)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = { Authorization: token }
  console.log(newBlog)
  console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response.data)
  return response.data
}

export default { getAll, setToken, create }