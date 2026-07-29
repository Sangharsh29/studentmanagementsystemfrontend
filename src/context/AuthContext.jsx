import { createContext, useContext, useState, useCallback } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const checkSession = useCallback(async () => {
    try {
      const res = await api.get('/api/auth/check')
      setIsAuthenticated(res.data === 'LOGGED_IN')
    } catch {
      setIsAuthenticated(false)
    }
  }, [])

  const login = useCallback(async (username, password) => {
    const res = await api.post('/api/auth/login', { username, password })
    if (res.data === 'SUCCESS') {
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(async () => {
    await api.post('/api/auth/logout')
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkSession, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}