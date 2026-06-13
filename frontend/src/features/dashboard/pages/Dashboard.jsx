import React, { useState } from 'react'

import Navbar from '../components/Navbar'

import MoodDetector from '../../moodDetection/components/MoodDetector'
import MoodSection from '../components/MoodSection'
import SongList from "../components/SongList.jsx"
import SelectMood from '../components/SelectMood'
import PlayNow from '../components/PlayNow'

import { useMoodDetection } from '../../moodDetection/hooks/useMoodDetection'
import { useSongs } from '../../songs/hooks/useSongs'
import UploadSong from '../components/UploadSong.jsx'

const Dashboard = () => {

  // const [currentSong, setCurrentSong] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  function handleSelect(data, idx) {
    setCurrentSong(data)
    setCurrentIndex(idx)
  }
  const { videoRef, mood, handleDetectMood } = useMoodDetection();
  const { song, loading, fetchSong,currentSong, setCurrentSong } = useSongs()
  // const [mood, setMood] = useState("Detect");

  return (

    <div className='dashboard'>

      <Navbar />

      <div className="middle">

        <MoodDetector
          videoRef={videoRef}
          mood={mood}
          handleDetectMood={handleDetectMood}
        />

        <MoodSection/>

        <div className='song-list'>
          <h3>songs for you</h3>
          <div className="lists">
            {song.map((data, idx) => (
              <SongList key={idx} data={data} idx={idx} onSelect={handleSelect} />
            ))
            }
          </div>
        </div>

      </div>

      <div className="footer">

        <SelectMood />

        <PlayNow currentSong={currentSong} />

        <UploadSong />

      </div>

    </div>
  )
}

export default Dashboard