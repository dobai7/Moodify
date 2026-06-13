import { createContext, useState, useEffect } from "react";
import { RegisterUser, LoginUser, GetMe, logoutApi } from "./apis/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  async function register(username, email, password) {
    try {
      setLoading(true)

      const data = await RegisterUser(username, email, password)
      return data.message

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    try {
      setLoading(true)

      const data = await LoginUser(email, password)

      setUser(data.user)

    } catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  async function getMe() {
  try {
    setLoading(true)

    const data = await GetMe()

    setUser(data.user)

  } catch (err) {

    if (err.response?.status === 401) {
      setUser(null)
      return
    }

    console.log(err)

  } finally {
    setLoading(false)
  }
}

  async function logout() {
  try {
    setLoading(true)
    await logoutApi()
    setUser(null)
  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    getMe()
    // setLoading(false)
  },[])


  return (
    <AuthContext.Provider value={{ user, loading, register, login, getMe , logout}}>
      {children}
    </AuthContext.Provider>
  )
}