import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { useSubjects } from '../hooks/useSubjects'
import { addSubject } from '../store/slices/subjectSlice'
import api from '../api/axios'

function Marks() {
  const dispatch = useDispatch()
  const { subjects } = useSubjects()
  const [studentId, setStudentId] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [maxMarks, setMaxMarks] = useState('')
  const [obtained, setObtained] = useState('')
  const [marksList, setMarksList] = useState([])
  const [newSubject, setNewSubject] = useState('')
  const [subjectMessage, setSubjectMessage] = useState('')

  async function handleAddSubject() {
    if (!newSubject.trim()) { alert('Enter a subject name'); return }
    const result = await dispatch(addSubject(newSubject.trim()))
    if (result.payload === 'DUPLICATE') {
      setSubjectMessage('This subject already exists')
    } else {
      setSubjectMessage('Subject added successfully')
      setNewSubject('')
    }
  }

  const saveMarks = useCallback(async () => {
    if (!studentId || !selectedSubject) { alert('Fill all fields'); return }
    await api.post('/api/marks', {
      subjectName: selectedSubject,
      maxMarks,
      marksObtained: obtained,
      student: { studentId }
    })
    const res = await api.get(`/api/marks/student/${studentId}`)
    setMarksList(res.data)
  }, [studentId, selectedSubject, maxMarks, obtained])

  async function loadMarks() {
    if (!studentId) { alert('Enter Student ID first'); return }
    const res = await api.get(`/api/marks/student/${studentId}`)
    setMarksList(res.data)
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h2>Marks Entry</h2>

        <h3>Add New Subject</h3>
        <label>New Subject Name :</label>
        <input value={newSubject} onChange={e => setNewSubject(e.target.value)} />
        <button onClick={handleAddSubject}>Add Subject</button>
        {subjectMessage && <p>{subjectMessage}</p>}

        <h3>Enter Marks</h3>
        <label>Student ID :</label>
        <input type="number" value={studentId} onChange={e => setStudentId(e.target.value)} />

        <label>Subject Name :</label>
        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map(s => (
            <option key={s.subjectId} value={s.subjectName}>{s.subjectName}</option>
          ))}
        </select>

        <label>Max Marks :</label>
        <input type="number" value={maxMarks} onChange={e => setMaxMarks(e.target.value)} />

        <label>Marks Obtained :</label>
        <input type="number" value={obtained} onChange={e => setObtained(e.target.value)} />

        <div className="btn-row">
          <button onClick={saveMarks}>Save Marks</button>
          <button onClick={loadMarks}>Load Marks</button>
        </div>

        <h3>Marks List</h3>
        <table>
          <thead>
            <tr><th>Subject</th><th>Max Marks</th><th>Marks Obtained</th></tr>
          </thead>
          <tbody>
            {marksList.map((m, i) => (
              <tr key={i}>
                <td>{m.subjectName}</td>
                <td>{m.maxMarks}</td>
                <td>{m.marksObtained}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Marks