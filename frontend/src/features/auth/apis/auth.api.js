import axios from "axios"

const api = axios.create({
  baseURL: "https://moodify-jwuc.onrender.com",
  withCredentials: true
})

export async function RegisterUser(username, email, password) {
  try {
    const response = await api.post("/api/auth/register", { username, email, password })
    return response.data
  } catch (error) {
    console.log("Error registering user:", error)
    throw error
  }
}

export async function LoginUser(email, password) {
  try {
    const response = await api.post("/api/auth/login", { email, password })
    return response.data
  } catch (error) {
    console.log("error login user:", error)
    throw error
  }
}

export async function GetMe() {
  try {
    const response = await api.get("/api/auth/get-me")
    return response.data
  } catch (err) {
    console.log("error in getMe function", err)
    throw err
  }
}

export async function logoutApi() {
  try {
    const response = await api.get("/api/auth/logout")
    return response.data
  } catch (err) {
    console.log("error in getMe function", err)
    throw err
  }
}