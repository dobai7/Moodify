import { useRef, useState, useEffect } from "react"

const PlayNow = ({ currentSong }) => {


  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("0:00")
  // const [duration, setDuration] = useState(audioRef.current.formatTime(duration))
  const [duration, setDuration] = useState("0:00")

  function touglePlay() {
    if (isPlaying) {
      audioRef.current.pause()
    }
    else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  function handleTimeUpdate() {
    const { currentTime, duration } = audioRef.current

    // if (!duration) return


    setProgress((currentTime / duration) * 100)
    setCurrentTime(formatTime(currentTime))
    setDuration(formatTime(duration))
  }

  function handleSeek(e) {
    audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration
    setProgress(e.target.value)
  }

  function formatTime(sec) {
    if (isNaN(sec)) return "0:00"
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  function handleForward() {
    audioRef.current.currentTime += 10
  }

  function handleBackward() {
    audioRef.current.currentTime -= 10
  }


  if (!currentSong) {
    return <div className="play-song"><p className="no-song">Select song from the list </p></div>
  }


  return (
    <div className="play-song">

      {/* Left */}
      <div className="player-left">
        <img src={currentSong.thumbnail} width="55" height="55" />
        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>



      {/* Center */}
      <div className="player-center">
        <div className="player-controls">
          <i className="ri-replay-10-line" onClick={handleBackward}></i>
          <i className={isPlaying ? "ri-pause-fill" : "ri-play-fill"} onClick={touglePlay}></i>
          <i className="ri-forward-10-line" onClick={handleForward}></i>
        </div>
        <div className="player-progress">
          <span>{currentTime}</span>
          <input type="range" min="0" max="100" value={progress} onChange={handleSeek} />
          <span>{duration}</span>
        </div>
      </div>

      <audio ref={audioRef} src={currentSong.audioUrl} onTimeUpdate={handleTimeUpdate} />

    </div>
  )
}

export default PlayNow