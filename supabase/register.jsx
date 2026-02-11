import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('public')

  const handleRegister = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) return alert(error.message)

    await supabase.from('users').insert({
      id: data.user.id,
      email,
      role
    })

    alert('Registered successfully')
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Create Account</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />

      <select onChange={e => setRole(e.target.value)}>
        <option value="public">Public User</option>
        <option value="pharmacy">Pharmacy</option>
        <option value="admin">Admin</option>
      </select>

      <button>Create Account</button>
    </form>
  )
}