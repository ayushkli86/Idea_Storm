import { Navigate } from 'react-router-dom'
import { useAuth } from './authprovider'

export default function RequireAuth({ children, allowed }) {
  const { user, role, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/login" />
  if (!allowed.includes(role)) return <Navigate to="/" />

  return children
}