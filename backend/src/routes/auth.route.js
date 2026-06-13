import express from "express"
import { registerController,loginController,getMe,verifyEmailController , logoutController} from "../controllers/auth.controller.js"
import { registerValidator,loginValidator } from "../middlewares/validate.middleware.js"
import { verifyUser } from "../middlewares/verify.middleware.js"

const authRoute = express()

//for register
authRoute.post("/register",registerValidator,registerController)

//for login
authRoute.post("/login", loginValidator, loginController)

//for getting user details
authRoute.get("/get-me",verifyUser,getMe)

//for verify user
authRoute.get("/verify-email",verifyEmailController)

//for logout
authRoute.get("/logout", verifyUser, logoutController)

export default authRoute