import mongoose from "mongoose";
import dns from 'node:dns'
dns.setServers(['1.1.1.1','0.0.0.0'])


const connectDB = async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URI)
      console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;