import { memo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="sidebar">
      <h2>STUDENT MANAGEMENT SYSTEM</h2>
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/student">Student</NavLink></li>
        <li><NavLink to="/attendance">Attendance</NavLink></li>
        <li><NavLink to="/marks">Marks Entry</NavLink></li>
        <li><NavLink to="/result">Result Report</NavLink></li>
        <li><NavLink to="/search">Student Search</NavLink></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  )
}

export default memo(Sidebar)