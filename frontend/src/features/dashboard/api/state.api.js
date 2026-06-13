import axios from "axios";

const api = axios.create({
  baseURL:"http://localhost:3000/api/state",
  withCredentials:true,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

export async function updateMoodApi(mood){
  try{
    const response = await api.patch("/mood",{mood})
    return response.data
  }catch(err){
    throw err
  }
}

export async function updateSongApi(){
  try{
    const response = await api.patch("/song")
    return response.data
  }catch(err){
    throw err
  }
}

export async function getStatesApi(){
  try{
    const response = await api.get("/")
    return response.data
  }catch(err){
    throw err
  }
}