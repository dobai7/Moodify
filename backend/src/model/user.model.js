import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select:false
  },
  verified:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema)

export default userModel;