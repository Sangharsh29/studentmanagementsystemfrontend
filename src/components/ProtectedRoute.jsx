import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {
  const { isAuthenticated, checkSession } = useAuth()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (isAuthenticated === null) return <div className="loading">Checking session...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default ProtectedRoute