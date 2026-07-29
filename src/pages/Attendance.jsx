import { useState, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import { useStudents } from '../hooks/useStudents'
import api from '../api/axios'

function Attendance() {
  const { students } = useStudents()
  const [date, setDate] = useState('')
  const [className, setClassName] = useState('')
  const [statuses, setStatuses] = useState({})
  const [message, setMessage] = useState('')

  const filteredStudents = students.filter(
    s => className !== '' && s.className.toLowerCase() === className.toLowerCase()
  )

  const handleStatusChange = useCallback((studentId, value) => {
    setStatuses(prev => ({ ...prev, [studentId]: value }))
  }, [])

  async function saveAttendance() {
    if (!date) { alert('Select a date first'); return }
    if (filteredStudents.length === 0) { alert('No students found for this class'); return }
    for (const student of filteredStudents) {
      await api.post('/api/attendance', {
        date,
        status: statuses[student.studentId] || 'Present',
        student: { studentId: student.studentId }
      })
    }
    setMessage('Attendance saved successfully')
  }

  function clearAttendance() {
    setDate('')
    setClassName('')
    setStatuses({})
    setMessage('')
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h2>Attendance</h2>

        <label>Date :</label>
        <input type="date" value={date}
          onChange={e => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]} />

        <label>Class :</label>
        <input type="text" value={className}
          onChange={e => setClassName(e.target.value)}
          placeholder="e.g. ITI COPA" />

        {message && <p style={{ color: 'green' }}>{message}</p>}

        <h3>Attendance List</h3>
        <table>
          <thead>
            <tr><th>Student ID</th><th>Name</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>
                  <select
                    value={statuses[student.studentId] || 'Present'}
                    onChange={e => handleStatusChange(student.studentId, e.target.value)}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="btn-row">
          <button onClick={saveAttendance}>Save Attendance</button>
          <button onClick={clearAttendance}>Clear</button>
        </div>
      </div>
    </div>
  )
}

export default Attendance