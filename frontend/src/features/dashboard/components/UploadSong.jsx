import React, { useState } from 'react'
import { useDropzone } from "react-dropzone"
import { useSongs } from '../../songs/hooks/useSongs'


const UploadSong = () => {

  const [mood, setMood] = useState("")
  const [file, setFile] = useState(null)

  const { loading, createSong } = useSongs()

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3"]
    },
    multiple: false,

    onDrop: (acceptedFiles) => {

      setFile(acceptedFiles[0]);

    }
  })

  async function handleUpload() {
    if (!file) return

    const formData = new FormData();

    formData.append("song", file);

    formData.append("mood", mood);

    await createSong(formData)
    alert("Song Uploaded")
    setFile(null)


  }

  return (
    <div className='upload-song'>
      <div className="dropzone">

        <div {...getRootProps()} className="dz1">
          <input {...getInputProps()} />

          {
            file
              ? <p>{file.name}</p>
              : <p>Drop song here / click</p>
          }

        </div>

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}

        >
          <option value="" disabled>
            Mood
          </option>

          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="romantic">Romantic</option>
          <option value="neutral">Neutral</option>
          <option value="angry">Angry</option>
          <option value="chill">Chill</option>
          <option value="motivational">Motivate</option>
          <option value="lonely">Lonely</option>
          <option value="surprised">Surprised</option>


        </select>
      </div>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>


    </div>
  )
}

export default UploadSong
