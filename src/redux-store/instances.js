import axios from 'axios'

export const userInstance = axios.create({
  baseURL: 'http://localhost:3100/api/users',
})
