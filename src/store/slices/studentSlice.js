import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const fetchStudents = createAsyncThunk('students/fetchAll', async () => {
  const res = await api.get('/api/students')
  return res.data
})

export const addStudent = createAsyncThunk('students/add', async (student) => {
  const res = await api.post('/api/students', student)
  return res.data
})

export const updateStudent = createAsyncThunk('students/update', async ({ id, data }) => {
  const res = await api.put(`/api/students/${id}`, data)
  return res.data
})

export const deleteStudent = createAsyncThunk('students/delete', async (id) => {
  await api.delete(`/api/students/${id}`)
  return id
})

const studentSlice = createSlice({
  name: 'students',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStudents.pending, state => { state.loading = true })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const idx = state.list.findIndex(s => s.studentId === action.payload.studentId)
        if (idx !== -1) state.list[idx] = action.payload
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s.studentId !== action.payload)
      })
  }
})

export default studentSlice.reducer