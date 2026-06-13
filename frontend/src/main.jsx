import { createRoot } from 'react-dom/client'
import "./shared/main.scss"
import App from './App.jsx'

import router from './Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { SongProvider } from './features/songs/song.context.jsx'
import { MoodProvider } from './features/moodDetection/MoodContext.jsx'
import { StateProvider } from './features/dashboard/state.context.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>

    <SongProvider>
      <MoodProvider>
        <StateProvider>
          <RouterProvider router={router} />
        </StateProvider>
      </MoodProvider>
    </SongProvider>

  </AuthProvider>
)
