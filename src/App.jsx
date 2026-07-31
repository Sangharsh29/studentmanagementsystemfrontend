import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorToast from './components/ErrorToast'
import { useTabClose } from './hooks/useTabClose'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Student from './pages/Student'
import Attendance from './pages/Attendance'
import Marks from './pages/Marks'
import Result from './pages/Result'
import Search from './pages/Search'

function App() {
  useTabClose()

  return (
    <>
      <ErrorToast />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<Student />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/result" element={<Result />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </>
  )
}

export default App