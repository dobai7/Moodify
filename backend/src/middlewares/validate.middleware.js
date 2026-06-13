import {body , validationResult} from "express-validator"

export const validate = (req,res,next)=>{
  const errors = validationResult(req)

  if (!errors.isEmpty()){
    return res.status(400).json({
      message:errors.array()[0].msg
    })
  }

  next()
}

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty().withMessage("username is required")
    .isLength({min:3}).withMessage("username must be atleast 3 character"),

  body("email")
    .trim()
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email format"),

  body("password")
    .notEmpty().withMessage("password is required")
    .isLength({min:6}).withMessage("password must be atleast 6 character"),

    validate
]

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required'),

    validate
]