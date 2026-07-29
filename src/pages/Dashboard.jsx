import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardCard from '../components/DashboardCard'
import api from '../api/axios'
import { useStudents } from '../hooks/useStudents'
import { useSubjects } from '../hooks/useSubjects'

function Dashboard() {
  const { students } = useStudents()
  const { subjects } = useSubjects()
  const [todayAttendance, setTodayAttendance] = useState(null)
  const [totalUsers, setTotalUsers] = useState(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    api.get(`/api/attendance/date/${today}`)
      .then(res => setTodayAttendance(res.data.length))
      .catch(() => setTodayAttendance(0))

    api.get('/api/users')
      .then(res => setTotalUsers(res.data.length))
      .catch(() => setTotalUsers(0))
  }, [])

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <div className="cards">
          <DashboardCard title="Total Students" value={students.length} />
          <DashboardCard title="Today Attendance" value={todayAttendance} />
          <DashboardCard title="Total Subjects" value={subjects.length} />
          <DashboardCard title="Total Users" value={totalUsers} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard