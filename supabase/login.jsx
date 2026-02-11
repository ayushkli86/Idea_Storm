import { supabase } from '../services/supabase'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) alert(error.message)
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />

      <button>Login</button>
    </form>
  )
}