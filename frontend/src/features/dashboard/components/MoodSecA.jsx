import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useMoodDetection } from '../../moodDetection/hooks/useMoodDetection'
import { useStateContext } from '../state.context'

const MoodSecA = () => {

  const { mood, moodStyle } = useMoodDetection()

  const { user } = useAuth()

  const { moodCount, songCount, loading , topMood } = useStateContext()

  // console.log(user, mood)

  return (
    <div className='moodsecton-upper'>

      <div className="uperOne">
        <div className="leftMood">
          <p>Welcome back,</p>
          <h1>{user? user.username : "Please Login..."}</h1>
          <p>{mood === "detect" ? "Please Detect Your Mood" : `You are feeling ${mood} today. Here are songs curated just for your mood.`}</p>
        </div>

        <i style={{
          color: moodStyle[mood]?.color,
          backgroundColor: moodStyle[mood]?.bg
        }} className={moodStyle[mood]?.icon}></i>
      </div>

      <div className="upperTwo">
        <div className="tracker">
          <h4>Mood Count</h4>
          <h2>{loading ? "..." :moodCount}</h2>
          <p>detection tracked</p>
        </div>

        <div className="tracker">
          <h4>Song Played</h4>
          <h2>{loading ? "..." :songCount}</h2>
          <p>songs tracked</p>
        </div>

        <div className="tracker">
          <h4>Today's Mood</h4>
          <h2>{loading ? "..." :topMood}</h2>
          <p>most felt today</p>
        </div>
      </div>
    </div>
  )
}

export default MoodSecA
