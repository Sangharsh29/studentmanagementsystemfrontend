import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../api/axios'

function Search() {
  const [searchId, setSearchId] = useState('')
  const [student, setStudent] = useState(null)
  const [notFound, setNotFound] = useState(false)

  async function searchStudent() {
    if (!searchId) { alert('Enter a Student ID'); return }
    try {
      const res = await api.get(`/api/students/${searchId}`)
      setStudent(res.data)
      setNotFound(false)
    } catch {
      setStudent(null)
      setNotFound(true)
    }
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h2>Student Search</h2>

        <label>Student ID :</label>
        <input type="number" value={searchId}
          onChange={e => setSearchId(e.target.value)} />

        <div className="btn-row">
          <button onClick={searchStudent}>Search</button>
        </div>

        {notFound && <p>No student found</p>}
        {student && (
          <div>
            <p><b>Student ID:</b> {student.studentId}</p>
            <p><b>Name:</b> {student.name}</p>
            <p><b>Class:</b> {student.className}</p>
            <p><b>Mobile No:</b> {student.mobileNo}</p>
            <p><b>Address:</b> {student.address}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search