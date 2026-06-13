import dotenv from "dotenv";
import app from './src/app.js';
import connectDB from "./src/config/database.js";

dotenv.config()

connectDB().then(()=>{
  app.listen(3000,() => {
    console.log("server is running on port 3000");
})
})


