import React from 'react'
import { useState } from 'react'
import "../style/auth.scss"
import { Link, useNavigate  } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Loading from './Loading.jsx'

const Login = () => {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const { user, loading, login} = useAuth()
const navigate = useNavigate()

const submitHandler =async (e)=>{
  e.preventDefault()

  if(loading)
  {
    return
  }

  await login(email,password)
  navigate("/")
}



  return (
    <main>
      {loading && <Loading />} 

      <div className="glow glow1"></div>
      <div className="glow glow2"></div>
      {/* <div className="glow3"></div> */}


      <div className="page">
        <h1>Login</h1>
        <form className='form1' onSubmit={submitHandler}>

          <label className='lable1' htmlFor="email">Email</label>

          <input 
          type="text"
          id='email'
          placeholder='enter email'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          />

          <label htmlFor="password">Password</label>
          
          <input 
          type="text"
          id='password'
          placeholder='enter password'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          />

          <button type='submit' className='btn1'>Login</button>
        </form>

        <p>Don't have an account? <Link style={{textDecoration:"none", color:"red" , fontSize:"1rem", fontWeight:600 , paddingLeft:"1rem"}} to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
