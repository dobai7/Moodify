import { createContext, useState, useEffect } from "react";
import { listSong, getAllSong } from "./apis/song.api";
import { AuthContext } from "../auth/auth.context";

export const SongContext = createContext()

export const SongProvider = ({children})=>{
  const [song, setSong] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentSong, setCurrentSong] = useState(null) // 👈 add karo

  async function createSong(formData){
    try{
      setLoading(true)

      // const formData = new FormData()
      // formData.append("song", file)
      // formData.append("mood", mood)

      const data = await listSong(formData)
      return data

    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  async function fetchSong(mood) {
    try{
      setLoading(true)

      const data = await getAllSong(mood)
      setSong(data.songs)

      if(data.songs.length > 0 && !currentSong) { // 👈 ye add karo
      setCurrentSong(data.songs[0])
    }
      
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSong("neutral")
    // setLoading(false)
  },[])

  return(
    <SongContext.Provider value={{song,loading,createSong,fetchSong, currentSong, setCurrentSong}}>
      {children}
    </SongContext.Provider>
  )

}