import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSongs = ()=>{
  return useContext(SongContext)
}