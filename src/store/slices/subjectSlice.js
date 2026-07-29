import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const fetchSubjects = createAsyncThunk('subjects/fetchAll', async () => {
  const res = await api.get('/api/subjects')
  return res.data
})

export const addSubject = createAsyncThunk('subjects/add', async (subjectName) => {
  const res = await api.post('/api/subjects', { subjectName })
  return res.data
})

const subjectSlice = createSlice({
  name: 'subjects',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubjects.pending, state => { state.loading = true })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        if (action.payload !== 'DUPLICATE') {
          state.list.push(action.payload)
        }
      })
  }
})

export default subjectSlice.reducer