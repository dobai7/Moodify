import { useRef, useState, useEffect } from "react";
import { useSongs } from "../../songs/hooks/useSongs";

import { loadModels, detectMood } from "../services/mood.service";

import { getDominantMood } from "../utils/mood.utils";

import { useMoodContext } from "../MoodContext";

// import { useStateContext } from "../../dashboard/state.context";
import { useStates } from "../../dashboard/hook/useStates";

export function useMoodDetection() {
  const videoRef = useRef(null);
  const { fetchSong } = useSongs()

  // const [mood, setMood] = useState("Detect");
  const { mood, setMood } = useMoodContext()
  // const {setMoodCount} = useStateContext()
  const { updateMood } = useStates()

  useEffect(() => {

    async function init() {

      await loadModels();

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true
        });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    init();

  }, []);

  const moodStyle = {
    none: {
      icon: "ri-question-line",
      color: "rgba(255,255,255,0.3)",
      bg: "rgba(255,255,255,0.1)"
    },
    happy: {
      icon: "ri-emotion-happy-line",
      color: "#FFD93D",
      bg: "#FFF7D6"
    },

    sad: {
      icon: "ri-emotion-sad-line",
      color: "#4D96FF",
      bg: "#DCEBFF"
    },

    romantic: {
      icon: "ri-heart-line",
      color: "#FF4D6D",
      bg: "#FFE0E6"
    },

    neutral: {
      icon: "ri-emotion-normal-line",
      color: "#888888",
      bg: "#EEEEEE"
    },

    angry: {
      icon: "ri-fire-line",
      color: "#FF6B35",
      bg: "#FFE2D6"
    },

    chill: {
      icon: "ri-moon-clear-line",
      color: "#6C63FF",
      bg: "#E4E2FF"
    },

    motivate: {
      icon: "ri-rocket-line",
      color: "#00C897",
      bg: "#D9FFF3"
    },

    lonely: {
      icon: "ri-user-heart-line",
      color: "#A084CA",
      bg: "#EEE6FF"
    },

    surprised: {
      icon: "ri-sparkling-line",
      color: "#FF9F1C",
      bg: "#FFF0D9"
    },

    detect: {
      icon: "ri-emotion-happy-line",
      color: "#00B894",
      bg: "#DFFFF5"
    }
  }

  async function handleDetectMood() {

    const detection =
      await detectMood(videoRef.current);

    if (detection) {

      const mainMood =
        getDominantMood(
          detection.expressions
        );

      // console.log("mood:", mainMood)  // ye bhi
      fetchSong(mainMood)
      updateMood(mainMood)

      setMood(mainMood);
    }
  }

  return {
    videoRef,
    mood,
    setMood,
    handleDetectMood,
    moodStyle
  }
}