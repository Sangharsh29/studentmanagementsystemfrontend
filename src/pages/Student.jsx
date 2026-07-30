import { useState, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Sidebar from '../components/Sidebar'
import { useStudents } from '../hooks/useStudents'
import { addStudent, updateStudent, deleteStudent } from '../store/slices/studentSlice'

const schema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  name: z.string().min(1, 'Name is required'),
  className: z.string().min(1, 'Class is required'),
  mobileNo: z.string().min(10, 'Enter valid mobile number'),
  address: z.string().min(1, 'Address is required')
})

function Student() {
  const dispatch = useDispatch()
  const { students, loading } = useStudents()
  const [selectedId, setSelectedId] = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  // Phase 8 - useMemo
  const studentCount = useMemo(() => students.length, [students])

  // Phase 8 - useCallback
  const fillForm = useCallback((student) => {
    setSelectedId(student.studentId)
    setValue('studentId', String(student.studentId))
    setValue('name', student.name)
    setValue('className', student.className)
    setValue('mobileNo', student.mobileNo)
    setValue('address', student.address)
  }, [setValue])

  const clearForm = useCallback(() => {
    setSelectedId(null)
    reset()
  }, [reset])

  async function onSave(data) {
    await dispatch(addStudent(data))
    clearForm()
  }

  async function onUpdate(data) {
    if (!selectedId) { alert('Select a student first'); return }
    await dispatch(updateStudent({ id: selectedId, data }))
    clearForm()
  }

  async function onDelete() {
    if (!selectedId) { alert('Select a student first'); return }
    await dispatch(deleteStudent(selectedId))
    clearForm()
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h2>Student Registration</h2>

        <label>Student ID :</label>
        <input {...register('studentId')} placeholder="Enter Student ID" />
        {errors.studentId && <p className="error">{errors.studentId.message}</p>}

        <label>Name :</label>
        <input {...register('name')} placeholder="Enter Student Name" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>Class :</label>
        <input {...register('className')} placeholder="Enter Class" />
        {errors.className && <p className="error">{errors.className.message}</p>}

        <label>Mobile No :</label>
        <input {...register('mobileNo')} placeholder="Enter Mobile No" />
        {errors.mobileNo && <p className="error">{errors.mobileNo.message}</p>}

        <label>Address :</label>
        <textarea {...register('address')} placeholder="Enter Address" />
        {errors.address && <p className="error">{errors.address.message}</p>}

        <div className="btn-row">
          <button onClick={handleSubmit(onSave)}>Save</button>
          <button onClick={handleSubmit(onUpdate)}>Update</button>
          <button onClick={onDelete}>Delete</button>
          <button onClick={clearForm}>Clear</button>
        </div>

        <h3>Student List</h3>
        {loading ? <p>Loading...</p> : (
          <table>
            <thead>
              <tr>
                <th>Student ID</th><th>Name</th><th>Class</th>
                <th>Mobile No</th><th>Address</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr
                  key={student.studentId}
                  onClick={() => fillForm(student)}
                  style={{
                    cursor: 'pointer',
                    background: selectedId === student.studentId ? '#dceeff' : ''
                  }}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.mobileNo}</td>
                  <td>{student.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Student