import express from "express"
import { uploadSongController, getSongsController } from "../controllers/song.controller.js"
import upload from "../middlewares/useMulter.js"

const songRouter = express.Router()

//for create songs
//api :- /api/song/upload
songRouter.post("/upload", upload.single("song") , uploadSongController )

/**
 * for get the songs
 * /api/song/
 */
songRouter.get("/:mood", getSongsController)


export default songRouter