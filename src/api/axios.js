import axios from 'axios'

const api = axios.create({
  baseURL: 'https://studentmanagementsystem-kbv3.onrender.com',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid — send to login
      window.location.replace('/login')
    } else if (!error.response) {
      // Network error or CORS — server unreachable
      window.dispatchEvent(new CustomEvent('app-error', {
        detail: 'Cannot connect to server. Please try again.'
      }))
    } else {
      // Any other server error
      window.dispatchEvent(new CustomEvent('app-error', {
        detail: 'Something went wrong. Please try again.'
      }))
    }
    return Promise.reject(error)
  }
)

export default api