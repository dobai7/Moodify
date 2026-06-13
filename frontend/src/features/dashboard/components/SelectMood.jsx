import React, { useState } from 'react'
import { useMoodDetection } from '../../moodDetection/hooks/useMoodDetection'
import { useSongs } from '../../songs/hooks/useSongs'
import { useStates } from '../hook/useStates'
import { useAuth } from '../../auth/hooks/useAuth'

const SelectMood = () => {
  const moods = ["happy", "sad", "romantic", "neutral", "angry", "chill", "motivate", "lonely", "surprised"]
  const [selected, setSelected] = useState("")

  const { setMood, moodStyle, mood } = useMoodDetection()
  const { fetchSong } = useSongs()
  const { updateMood } = useStates()
  const { user } = useAuth()

  function handleApply() {
    if (!selected || selected === mood) return
    fetchSong(selected)
    setMood(selected)
    updateMood(selected)
  }

  return (
    <div className='select-mood'>
      <p><i className="ri-crosshair-2-line"></i>Select Mood Manually</p>

      <div className="inner-mode">
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="" disabled>Select Mood</option>
          {moods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button onClick={handleApply} className="mood-btn"
        disabled={!user}
          style={{ backgroundColor: moodStyle[selected]?.color || "#888" }}>
          Apply
        </button>
      </div>
    </div>
  )
}

export default SelectMood