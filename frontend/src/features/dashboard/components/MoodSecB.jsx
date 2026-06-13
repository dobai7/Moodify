import React, { useState } from 'react'
import { useStateContext } from '../state.context'
import { useMoodDetection } from '../../moodDetection/hooks/useMoodDetection'

const MoodSecB = () => {
  const [view, setView] = useState("daily")
  const { dailyData, weeklyData, loadingThree } = useStateContext()
  const { moodStyle } = useMoodDetection()

  return (
    <div className='moodsecton-lower'>
      <div className="toggle-btns">
        <button className={view === "daily" ? "active" : ""} onClick={() => setView("daily")}>Today</button>
        <button className={view === "weekly" ? "active" : ""} onClick={() => setView("weekly")}>7 Days</button>
      </div>

      {loadingThree ? <p className="loading-text">Loading...</p> : (
        <div className="mood-chart">
          {view === "daily" ? (
            dailyData.length > 0 ? dailyData.map((item, i) => (
              <div key={i} className="chart-col">
                
                <div className="circle" style={{ backgroundColor: moodStyle[item.mood]?.bg, border: `2px solid ${moodStyle[item.mood]?.color}` }}>
                  <i style={{ color: moodStyle[item.mood]?.color }} className={moodStyle[item.mood]?.icon}></i>
                </div>
                <span className="count" >{item.count}</span>
                <span className="label">{item.mood}</span>
              </div>
            )) : <p className="loading-text">No mood detected today</p>
          ) : (
            weeklyData.map((item, i) => (
              <div key={i} className="chart-col">
                <span className="day-label">{item.day}</span>
                <div className="circle" style={{ backgroundColor: moodStyle[item.mood]?.bg, border: `2px solid ${moodStyle[item.mood]?.color}` }}>
                  <i style={{ color: moodStyle[item.mood]?.color }} className={moodStyle[item.mood]?.icon}></i>
                </div>
                <span className="label">{item.mood === "none" ? "-" : item.mood}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default MoodSecB