import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../context/AuthContext'

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
})

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(data) {
    const success = await login(data.username, data.password)
    if (success) {
      navigate('/dashboard', { replace: true })
    } else {
      setError('root', { message: 'Invalid Username or Password' })
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-left">
          <img src="/graduate.jpeg" alt="Student" />
        </div>
        <div className="login-right">
          <h2>STUDENT MANAGEMENT SYSTEM</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-row">
              <label>User Name :</label>
              <input {...register('username')} placeholder="Enter Username" />
              {errors.username && <p className="error">{errors.username.message}</p>}
            </div>
            <div className="login-row">
              <label>Password :</label>
              <input type="password" {...register('password')} placeholder="Enter Password" />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <div className="login-buttons">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <button type="button" onClick={() => window.location.reload()}>Cancel</button>
            </div>
            {errors.root && <p className="error">{errors.root.message}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login