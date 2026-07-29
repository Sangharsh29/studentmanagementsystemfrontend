import { useState, useEffect } from 'react'

function ErrorToast() {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    function handleError(e) {
      setMessage(e.detail)
      // Auto-hide after 4 seconds
      setTimeout(() => setMessage(null), 4000)
    }
    window.addEventListener('app-error', handleError)
    return () => window.removeEventListener('app-error', handleError)
  }, [])

  if (!message) return null

  return (
    <div className="error-toast">
      <span>{message}</span>
      <button onClick={() => setMessage(null)}>✕</button>
    </div>
  )
}

export default ErrorToast