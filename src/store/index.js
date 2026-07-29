import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/studentSlice'
import subjectReducer from './slices/subjectSlice'

export const store = configureStore({
  reducer: {
    students: studentReducer,
    subjects: subjectReducer
  }
})