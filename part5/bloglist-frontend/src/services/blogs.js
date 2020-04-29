import axios from 'axios'
const baseUrl = '/blogs' // not /api/blogs on mine

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }