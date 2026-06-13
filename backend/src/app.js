import express from 'express';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import songRouter from './routes/song.route.js';
import stateRouter from './routes/state.route.js';

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/song",songRouter)
app.use("/api/state",stateRouter)



export default app;