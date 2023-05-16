import { Link } from 'react-router-dom'
import { useState } from 'react'
import './register.css'
import axios from 'axios'

export default function Register() {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  
  
  const handleSubmit =async (e)=>{
    e.preventDefault();
    setError(false)
    try{    
      const res = await axios.post('/auth/register',{
      username,
      email,
      password
    })
    res.data && window.location.replace('/login') //Once we have successfully registered, locate us to the login page.
}
    catch(err){
      setError(true)
    }
  }

  return (
    <div className='register'>
        <span className='registerTitle'>Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' className='registerInput' onChange={e=> setUsername(e.target.value)} placeholder='Enter your username...' />
        <label>Email</label>
        <input type='text' className='registerInput' onChange={e=> setEmail(e.target.value)} placeholder='Enter your email...' />
        <label>Password</label>
        <input type='password' className='registerInput' onChange={e=> setPassword(e.target.value)} placeholder='Enter your password...' />
        <button className="registerButton" type='submit'>Register</button>
        </form>
        <button className="loginRegisterButton"><Link style={{color:'white', textDecoration:'none'}} to='/login'>Login</Link></button>
        {error && <span style={{color:'red', marginTop:'10px'}}>Something went wrong!</span> }
        </div>
  )
}
