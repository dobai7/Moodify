import { createContext, useContext, useState, useEffect } from "react";
import { getStatesApi } from "./api/state.api";
import { AuthContext } from "../auth/auth.context";  // ← apna actual path check karna

const StateContext = createContext()

export function StateProvider({ children }) {
  const [moodCount, setMoodCount] = useState(0)
  const [songCount, setSongCount] = useState(0)
  const [loadingOne, setLoadingOne] = useState(false)
  const [loadingTwo, setLoadingTwo] = useState(false)
  const [loadingThree, setLoadingThree] = useState(false)
  const [topMood, setTopMood] = useState("none")
  const [dailyData, setDailyData] = useState([])
  const [weeklyData, setWeeklyData] = useState([])

  const { user } = useContext(AuthContext)  // ← NEW

  async function fetchState() {
    try {
      setLoadingThree(true)
      const data = await getStatesApi()
      setMoodCount(data.states.totalMoodDetections)
      setSongCount(data.states.totalSongsPlayed)

      const history = data.states.moodHistory
      const today = new Date().toDateString()
      const todayHistory = history.filter(
        entry => new Date(entry.detectedAt).toDateString() === today
      )

      if (todayHistory.length > 0) {
        const moodFrequency = {}
        todayHistory.forEach(entry => {
          moodFrequency[entry.mood] = (moodFrequency[entry.mood] || 0) + 1
        })
        const top = Object.keys(moodFrequency).reduce((a, b) =>
          moodFrequency[a] > moodFrequency[b] ? a : b
        )
        setTopMood(top)
      } else {
        setTopMood("none")
      }

      const allMoods = ["happy", "sad", "romantic", "neutral", "angry", "chill", "motivate", "lonely", "surprised"]
      const dayFrequency = {}
      allMoods.forEach(m => { dayFrequency[m] = 0 })
      todayHistory.forEach(entry => {
        if (dayFrequency[entry.mood] !== undefined) {
          dayFrequency[entry.mood] += 1
        }
      })
      const dailyArr = allMoods.map(mood => ({
        mood,
        count: dayFrequency[mood]
      }))
      setDailyData(dailyArr)

      const weeklyArr = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateStr = date.toDateString()
        const dayEntries = history.filter(e => new Date(e.detectedAt).toDateString() === dateStr)

        let topMoodOfDay = "none"
        if (dayEntries.length > 0) {
          const freq = {}
          dayEntries.forEach(e => { freq[e.mood] = (freq[e.mood] || 0) + 1 })
          topMoodOfDay = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b)
        }

        weeklyArr.push({
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          mood: topMoodOfDay
        })
      }
      setWeeklyData(weeklyArr)

    } catch (err) {
      console.log(err)
    } finally {
      setLoadingThree(false)
    }
  }

  useEffect(() => {
    if (user) fetchState()  
  }, [user])               

  return (
    <StateContext.Provider value={{ moodCount, setMoodCount, songCount, setSongCount, loadingOne, setLoadingOne, loadingTwo, setLoadingTwo, loadingThree, setLoadingThree, topMood, fetchState, dailyData, weeklyData }}>
      {children}
    </StateContext.Provider>
  )
}

export function useStateContext() {
  return useContext(StateContext);
}