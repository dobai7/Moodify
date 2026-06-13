import axios from "axios"

const api = axios.create(
  {
    baseURL:"http://localhost:3000",
    withCredentials:true
  }
)

export async function listSong(formData){
  try{

    const response = await api.post("/api/song/upload", formData)
    return response.data

  } catch(err){
    throw err
  } 
}

export async function getAllSong(mood){
  try{

    const response = await api.get(`/api/song/${mood}`)
    return response.data

  }catch(err){
    throw err
  } 
}