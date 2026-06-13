import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { sendMail } from "../services/nodemailer.js";
import { verificationMailHtml } from "../services/email.template.js";
import stateModel from "../model/state.model.js";
import blacklistModel from "../model/blacklist.model.js" 



export async function registerController(req, res) {

  try {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
      $or: [
        { username },
        { email }
      ]
    })

    if (isUserExists) {
      return res.status(409).json({
        message: "user already exists"
      })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      username, email, password: hash
    })

    await stateModel.create({userId:user._id})

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })



    const sub = "Request For Verification"
    const link = `http://localhost:3000/api/auth/verify-email?token=${token}`

    await sendMail(email, sub, "", verificationMailHtml(link))


    res.status(201).json({
      message: "check your email and verify yourself"
    })
  } catch (err) {
    res.status(500).json({ message: "something went wrong" })
  }


}

export async function loginController(req, res) {
  const { email, password } = req.body

  const user = await userModel.findOne({ email }).select("+password")

  if (!user) {
    return res.status(404).json({
      message: "user not found"
    })
  }

  if (!user.verified) {
    return res.status(403).json({ message: "please verify your email first" })
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "invalid credentials inside login controller"
    })
  }

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",  // cross-origin ke liye
  })



  res.status(200).json({
    message: "user login successfully",
    user
  })
}

export async function verifyEmailController(req, res) {
  try {

    const { token } = req.query

    if (!token) {
      return res.status(400).json({ message: "token missing" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    await userModel.findByIdAndUpdate(
      decoded.id,
      { verified: true }
    )

    res.status(200).json({
      message: "email verified successfully"
    })


  } catch (err) {
    return res.status(400).json({
      message: "invalid or expired token"
    })
  }
}

export async function getMe(req, res) {
  const user = req.user

  res.status(200).json({
    message: "get user successfully",
    user
  })
}


export async function logoutController(req, res) {
  try {
    const token = req.cookies.token

    await blacklistModel.create({
      token,
      deletedAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    })

    res.clearCookie("token")
    res.status(200).json({ message: "logged out successfully" })

  } catch (err) {
    res.status(500).json({ message: "logout failed" })
  }
}