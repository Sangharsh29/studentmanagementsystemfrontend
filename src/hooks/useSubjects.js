import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubjects } from '../store/slices/subjectSlice'

export function useSubjects() {
  const dispatch = useDispatch()
  const { list, loading } = useSelector(state => state.subjects)

  useEffect(() => {
    if (list.length === 0) dispatch(fetchSubjects())
  }, [dispatch, list.length])

  return { subjects: list, loading }
}