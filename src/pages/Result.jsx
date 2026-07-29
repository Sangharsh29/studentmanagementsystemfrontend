import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../api/axios'

function Result() {
  const [studentId, setStudentId] = useState('')
  const [result, setResult] = useState(null)

  async function showResult() {
    if (!studentId) { alert('Enter a Student ID first'); return }
    const res = await api.get(`/api/result/${studentId}`)
    setResult(res.data)
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h2>Result Report</h2>

        <label>Student ID :</label>
        <input type="number" value={studentId}
          onChange={e => setStudentId(e.target.value)} />

        <div className="btn-row">
          <button onClick={showResult}>Show Report</button>
        </div>

        {result && (
          <>
            <h3>
              Total: {result.totalObtained} / {result.totalMax} &nbsp;|&nbsp;
              Percentage: {result.percentage}% &nbsp;|&nbsp;
              Result: <span style={{ color: result.result === 'Pass' ? 'green' : 'red' }}>
                {result.result}
              </span>
            </h3>
            <table>
              <thead>
                <tr><th>Subject</th><th>Max Marks</th><th>Marks Obtained</th></tr>
              </thead>
              <tbody>
                {result.marksList.map((m, i) => (
                  <tr key={i}>
                    <td>{m.subjectName}</td>
                    <td>{m.maxMarks}</td>
                    <td>{m.marksObtained}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default Result