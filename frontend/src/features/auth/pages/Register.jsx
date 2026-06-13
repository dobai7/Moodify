import React, { useState } from 'react'
import "../style/auth.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Loading from './Loading.jsx'

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)

  const navigate = useNavigate()
  const { user, loading, register } = useAuth()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (loading) {
      return
    }

    await register(username, email, password)
    setIsRegistered(true)
  }
  return (
    <main>
      {loading && <Loading />}

      <div className="glow glow1"></div>
      <div className="glow glow2"></div>
      {/* <div className="glow3"></div> */}


      <div className="page">
        <h1>Register</h1>

        {
          isRegistered ? (
            <div className="verify-box">
              <h2>Check your email and verify!</h2>
              <p>Already verified? <Link to="/login">Login here</Link></p>
            </div>
          ) : (
            <>
              <form className='form1' onSubmit={submitHandler}>

                <label className='lable1' htmlFor="username">Username</label>

                <input
                  type="text"
                  id='username'
                  placeholder='enter username'
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                />

                <label className='lable1' htmlFor="email">Email</label>

                <input
                  type="text"
                  id='email'
                  placeholder='enter email'
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />

                <label htmlFor="password">Password</label>

                <input
                  type="text"
                  id='password'
                  placeholder='enter password'
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />

                <button type='submit' className='btn1'>Register</button>
              </form>

              <p>Already have an account? <Link style={{textDecoration:"none", color:"red" , fontSize:"1rem", fontWeight:600 , paddingLeft:"1rem"}} to="/login">Login</Link></p>
            </>)
        }




      </div>
    </main>
  )
}

export default Register
