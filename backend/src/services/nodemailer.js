import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Email server is ready")
  }
})

export const sendMail = async (to, subject, text, html) => {
  try {

    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject,
      text,
      html,
    })

    console.log("message sent", info.messageId)

  } catch (err) { console.log(err) }
}