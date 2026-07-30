import axios from 'axios'

const api = axios.create({
  baseURL: 'https://studentmanagementsystem-kbv3.onrender.com',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status

    if (status === 401) {
      // Show message briefly before redirecting
      window.dispatchEvent(new CustomEvent('app-error', {
        detail: 'Session expired. Please log in again.'
      }))
      setTimeout(() => {
        window.location.replace('/login')
      }, 1500)
    } else if (!error.response) {
      window.dispatchEvent(new CustomEvent('app-error', {
        detail: 'Cannot connect to server. Please try again.'
      }))
    } else {
      window.dispatchEvent(new CustomEvent('app-error', {
        detail: `Error ${status}: Something went wrong. Please try again.`
      }))
    }

    return Promise.reject(error)
  }
)

export default api