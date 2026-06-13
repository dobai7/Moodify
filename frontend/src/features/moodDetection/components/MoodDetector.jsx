import { useMoodDetection } from "../hooks/useMoodDetection";
import { useAuth } from "../../auth/hooks/useAuth";
function MoodDetector(props){

  const { user } = useAuth()

  return (

    <div className="camera-section">

      <p><i className="ri-camera-line"></i> Mood Scanner</p>

      <video
        ref={props.videoRef}
        autoPlay
        muted
      />

      <h1>{props.mood}</h1>

      <button disabled={!user} onClick={props.handleDetectMood}>
        Detect Mood
      </button>

    </div>
  );
}

export default MoodDetector;