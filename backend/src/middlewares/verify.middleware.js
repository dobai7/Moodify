import blacklistModel from "../model/blacklist.model.js"
import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"


export async function verifyUser(req,res,next){

  try{
  const token = req.cookies.token
    
  if(!token){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }

  const isBlacklisted = await blacklistModel.findOne({ token })
    if (isBlacklisted) {
      return res.status(401).json({ message: "token expired, please login again" })
    }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

  const user = await userModel.findById(decoded.id)

  if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

  req.user = user

  next()
  }catch(err)
  {
    console.log(err)
    return res.status(401).json({
      message:"invalid token in catch block"
    })
  }

}