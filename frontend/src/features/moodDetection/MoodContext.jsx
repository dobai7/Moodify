import { createContext, useContext, useState } from "react";

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const [mood, setMood] = useState("detect");

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMoodContext() {
  return useContext(MoodContext);
}