import express from "express"
import { verifyUser } from "../middlewares/verify.middleware.js"
import { moodController, songController, getState } from "../controllers/state.controller.js"

const stateRouter = express.Router()

//for mood detect counter
//api:- /api/state/mood
stateRouter.patch("/mood",verifyUser,moodController)

//for song counter
//api:- /api/state/song
stateRouter.patch("/song",verifyUser,songController)

//for get counter data
//api:- /api/state/
stateRouter.get("/",verifyUser,getState)


export default stateRouter
