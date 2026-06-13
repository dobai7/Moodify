import React from 'react'
import { useStates } from '../hook/useStates'
import { useSongs } from '../../songs/hooks/useSongs'

const Songlist = ({ data, idx, onSelect }) => {
  const { updateSong } = useStates()
  const { currentSong, setCurrentSong } = useSongs()
  return (
    <div className='list' key={idx}
      onClick={() => {

        if (data._id !== currentSong?._id) {
          updateSong()
        }
        setCurrentSong(data)
        onSelect(data, idx)


      }}>
      <div className="leftsong">
        <img src={data.thumbnail} alt="" />
        <div className="left-text">
          <h3>{data.title}</h3>
          <p>{data.artist}</p>
        </div>
      </div>
      <i className="ri-play-large-line" ></i>
    </div>
  )
}

export default Songlist
