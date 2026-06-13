import { updateMoodApi, updateSongApi } from "../api/state.api";
import { useStateContext } from "../state.context";

export function useStates() {

  const {setMoodCount,setSongCount,setLoadingOne, setLoadingTwo, fetchState } = useStateContext()

  async function updateMood(mood) {
    try {
      setLoadingOne(true)
      const data = await updateMoodApi(mood)
      // setMoodCount(data.states.totalMoodDetections)
      await fetchState()
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingOne(false)
    }
  }

  async function updateSong() {
    try {
      setLoadingTwo(true)
      const data = await updateSongApi()
      // setSongCount(data.states.totalSongsPlayed)
      await fetchState()
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingTwo(false)
    }
  }

  return { updateMood, updateSong }
}