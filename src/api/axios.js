import axios from 'axios'

const api = axios.create({
  baseURL: 'https://studentmanagementsystem-kbv3.onrender.com',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

// Redirect to login automatically on session expiry
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default api