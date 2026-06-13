import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div className='navbar'>
      <div className="navleft">
        <i className="ri-music-2-line"></i>

        <div className="navhead">
          <h1>moodify</h1>
          <p>music for your mood</p>
        </div>
      </div>

      <div className="navright">
        <i
          className={isDark ? "ri-sun-fill" : "ri-moon-fill"}
          onClick={() => setIsDark(!isDark)}
        ></i>
        <i className="ri-user-3-line" onClick={()=>navigate("/login")}></i>
        
        <i className="ri-logout-box-r-line" onClick={async () => {
          await logout()
          navigate("/login")
        }}></i>
        
      </div>
    </div>
  )
}

export default Navbar