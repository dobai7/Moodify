import express from 'express';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import songRouter from './routes/song.route.js';
import stateRouter from './routes/state.route.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin: ["http://localhost:5173","https://moodify-jwuc.onrender.com/"],
  credentials: true
}))

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/song",songRouter)
app.use("/api/state",stateRouter)

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;