import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../store/slices/studentSlice'

export function useStudents() {
  const dispatch = useDispatch()
  const { list, loading, error } = useSelector(state => state.students)

  useEffect(() => {
    if (list.length === 0) dispatch(fetchStudents())
  }, [dispatch, list.length])

  return { students: list, loading, error }
}