
// authRouter.js

// router.post(
//   '/registerUser',
//   userValidationRules(),
//   validateUser,
//   async (req, res) => {
//     try {
//       const {
//         firstname,
//         lastname,
//         age,
//         password,
//         confirmPassword,
//         email,
//       } = req.body

//       // Check if user already exists
//       const existingUser = await User.findOne({ email })
//       if (existingUser) {
//         if (existingUser.status === 'Active') {
//           return res.status(400).json({
//             success: false,
//             message: 'User already exists and is activated',
//           })
//         } else {
//           return res.status(400).json({
//             success: false,
//             message: 'User already exists but is not activated. Please check your email for OTP.',
//           })
//         }
//       }

//       // Create a pending user
//       const newUser = await User.create({
//         firstname,
//         lastname,
//         age,
//         password,
//         confirmPassword,
//         email,
//         status: 'Pending', // Mark user as pending
//       })

//       return res.status(201).json({
//         success: true,
//         message: 'User registered successfully. Please check your email for OTP.',
//         user: newUser,
//       })
//     } catch (error) {
//       console.log(error.message)
//       return res.status(500).json({ success: false, error: error.message })
//     }
//   }
// )

// router.post('/verify-otp', async (req, res) => {
//   try {
//     const { email, otp } = req.body

//     // Find the most recent OTP for the email
//     const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
//     if (response.length === 0 || otp !== response[0].otp) {
//       return res.status(400).json({
//         success: false,
//         message: 'The OTP is not valid',
//       })
//     }

//     // Update user status to "Active"
//     await User.findOneAndUpdate({ email }, { status: 'Active' })

//     // Remove the OTP record
//     await OTP.deleteMany({ email })

//     return res.status(200).json({
//       success: true,
//       message: 'OTP verified successfully. Your account is now activated.',
//     })
//   } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({ success: false, error: error.message })
//   }
// })

// // authRouter.js

// const express = require('express')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const User = require('../models/user')
// const OTP = require('../models/otpModel')
// const otpGenerator = require('otp-generator')
// const router = express.Router()

// const userValidationRules = require('../validations/userValidation')
// const validateUser = require('../middleware/validateUser')
// require('dotenv').config()

// router.post(
//   '/registerUser',
//   userValidationRules(),
//   validateUser,
//   async (req, res) => {
//     try {
//       const { firstname, lastname, age, password, confirmPassword, email } =
//         req.body

//       const existingUser = await User.findOne({ email })
//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: 'User already exists',
//         })
//       }

//       let hashedPassword
//       try {
//         hashedPassword = await bcrypt.hash(password, 10)
//       } catch (error) {
//         return res.status(500).json({
//           success: false,
//           message: `Hashing password error for ${password}: ` + error.message,
//         })
//       }

//       const newUser = await User.create({
//         firstname,
//         lastname,
//         age,
//         password: hashedPassword,
//         confirmPassword,
//         email,
//       })

//       // Check if user already exists

//       // Find the most recent OTP for the email
//       const response = await OTP.find({ email })
//         .sort({ createdAt: -1 })
//         .limit(1)
//       if (response.length === 0 || otp !== response[0].otp) {
//         return res.status(400).json({
//           success: false,
//           message: 'The OTP is not valid',
//         })
//       }

//       // Secure password

//       return res.status(201).json({
//         success: true,
//         message: 'User registered successfully',
//         user: newUser,
//       })
//     } catch (error) {
//       console.log(error.message)
//       return res.status(500).json({ success: false, error: error.message })
//     }
//   }
// )

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send({
//         status: 'failed',
//         statusCode: 401,
//         message: 'Invalid Username Or Password',
//         token: '',
//       })
//     }

//     const tokenOptions = {
//       expiresIn: '1h',
//     }

//     const token = jwt.sign(
//       {
//         userId: user._id,
//       },
//       process.env.SECRET_KEY,
//       tokenOptions
//     )
//     res.status(200).send({
//       status: 'succeeded',
//       statusCode: 200,
//       message: 'Login Success',
//       token: token,
//     })
//   } catch (err) {
//     res.status(400).send({
//       status: 'failed',
//       statusCode: 400,
//       message: err.message,
//       token: 'Invalid token',
//     })
//   }
// })

// router.post('/send-otp', async (req, res) => {
//   try {
//     const { email } = req.body
//     // Check if user is already present
//     const checkUserPresent = await User.findOne({ email })
//     // If user found with provided email
//     if (checkUserPresent) {
//       return res.status(401).json({
//         success: false,
//         message: 'User is already registered',
//       })
//     }
//     let otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     })
//     let result = await OTP.findOne({ otp: otp })
//     while (result) {
//       otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//       })
//       result = await OTP.findOne({ otp: otp })
//     }
//     const otpPayload = { email, otp }
//     const otpBody = await OTP.create(otpPayload)
//     res.status(200).json({
//       success: true,
//       message: 'OTP sent successfully',
//       otp,
//     })
//   } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({ success: false, error: error.message })
//   }
// })

// module.exports = router

// const express = require('express')
// const sendMail = require('../services/mailService')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const MailTemplate = require('../templates/mailTemplate')
// const router = express.Router()
// const User = require('../models/user')

// const userValidationRules = require('../validations/userValidation')
// const validateUser = require('../middleware/validateUser')

// require('dotenv').config()

// router.post(
//   '/registerUser',
//   userValidationRules(),
//   validateUser,
//   async (req, res) => {
//     try {
//       const { firstname, lastname, age, password, confirmPassword, email } =
//         req.body

//       const user = new User({
//         firstname,
//         lastname,
//         age,
//         password,
//         confirmPassword,
//         email,
//       })
//       await user.save()

//       //   const template = new MailTemplate(firstname, lastname, password)
//       //   sendMail(email, 'Hoşgeldiniz', null, template.getTemplate('register'))

//       res.status(201).send({
//         status: 'succeeded',
//         message: 'User Created Successfully',
//         content: user,
//         statusCode: 201,
//       })
//     } catch (err) {
//       res.status(400).send({
//         status: 'failed',
//         message: err.message,
//         content: err,
//         statusCode: 400,
//       })
//     }
//   }
// )

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send({
//         status: 'failed',
//         statusCode: 401,
//         message: 'Invalid Username Or Password',
//         token: '',
//       })
//     }

//     const tokenOptions = {
//       expiresIn: '1h', // s saniye, m dakika, h saat, d gün
//       // notBefore: '15s', // 15 saniye sonra başlar
//       // audience: 'http://localhost:3000', // token hangi sunucuda kullanılacak
//       // issuer: 'http://localhost:5001', // token kimin tarafından veriliyor
//       // jwtid: 'CodeAcademyTokenId', // token id
//       // subject: 'nodejs dersleri için üretilen token, pervinden icaze almadan servisler çalışmaz', // token hangi konuda
//       // algorithm: 'HS256' // token hangi algoritmayla şifrelenecek
//     }

//     const token = jwt.sign(
//       {
//         userId: user._id, //,
//         // role: 'admin',
//         // manager: 'pervin',
//         // movzu: 'node.js',
//         // date: 'eski date',
//         // group:'RADFE203'
//       },
//       process.env.SECRET_KEY,
//       tokenOptions
//     )
//     res.status(200).send({
//       status: 'succeeded',
//       statusCode: 200,
//       message: 'Login Success',
//       token: token,
//     })
//   } catch (err) {
//     res.status(400).send({
//       status: 'failed',
//       statusCode: 400,
//       message: err.message,
//       token: 'Invalid token',
//     })
//   }
// })
// module.exports = router

// const express = require('express')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const nodemailer = require('nodemailer')
// const { v4: uuidv4 } = require('uuid')
// const path = require('path')
// const User = require('../models/user')
// const UserVerification = require('../models/UserVerification')
// const userValidationRules = require('../validations/userValidation')
// const validateUser = require('../middleware/validateUser')

// require('dotenv').config()

// const router = express.Router()

// // Create transporter for sending emails
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// })

// // Verify transporter
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('Ready for message')
//     console.log(success)
//   }
// })

// // Route to register a new user
// router.post(
//   '/registerUser',
//   userValidationRules(),
//   validateUser,
//   async (req, res) => {
//     try {
//       const { firstname, lastname, age, password, confirmPassword, email } =
//         req.body

//       // Check if the email is already registered
//       const existingUser = await User.findOne({ email })
//       if (existingUser) {
//         return res.status(400).json({
//           status: 'failed',
//           message: 'Email already exists',
//         })
//       }

//       // Create a new user instance
//       const user = new User({
//         firstname,
//         lastname,
//         age,
//         password,
//         confirmPassword,
//         email,
//         verified: false,
//       })

//       // Save the user to the database
//       await user.save()

//       // Send verification email
//       sendVerificationEmail(user, res)
//     } catch (err) {
//       res.status(400).json({
//         status: 'failed',
//         message: err.message,
//       })
//     }
//   }
// )

// // Function to send verification email
// const sendVerificationEmail = async ({ _id, email }, res) => {
//   try {
//     const currentUrl = 'http://localhost:5000/auth/'
//     const uniqueString = uuidv4() + _id

//     // Generate email options
//     const mailOptions = {
//       from: process.env.MAIL_USER,
//       to: email,
//       subject: 'Verify your email',
//       html: `<p>Verify your email address to complete the signup and login into your account</p> <p>This link <b>expires in 20 minutes</b> </p>
//     <p>Press <a href=${
//       currentUrl + 'registerUser/verify/' + _id + '/' + uniqueString
//     }>here</a> to proceed.</p>`,
//     }

//     // Hash unique string
//     const hashedUniqueString = await bcrypt.hash(uniqueString, 10)

//     // Save verification data to database
//     const newVerification = new UserVerification({
//       userId: _id,
//       uniqueString: hashedUniqueString,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 1200000, // 20 minutes expiry
//     })
//     await newVerification.save()

//     // Send verification email
//     await transporter.sendMail(mailOptions)

//     res.json({
//       status: 'PENDING',
//       message: 'Verification email sent successfully',
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       status: 'FAILED',
//       message: 'Verification email failed',
//     })
//   }
// }

// // Route to verify email
// router.get('/registerUserverify/:userId/:uniqueString', async (req, res) => {
//   try {
//     const { userId, uniqueString } = req.params

//     // Find verification data in the database
//     const verificationData = await UserVerification.findOne({ userId })
//     if (!verificationData) {
//       return res.redirect(
//         '/verified/error=true&message=Verification data not found'
//       )
//     }

//     // Check if verification link has expired
//     if (verificationData.expiresAt < Date.now()) {
//       // Remove verification data from database
//       await UserVerification.deleteOne({ userId })
//       return res.redirect(
//         '/verified/error=true&message=Link has expired. Please sign up again'
//       )
//     }

//     // Compare unique strings
//     const isUniqueStringValid = await bcrypt.compare(
//       uniqueString,
//       verificationData.uniqueString
//     )
//     if (!isUniqueStringValid) {
//       return res.redirect(
//         '/verified/error=true&message=Invalid verification details passed. Check your inbox.'
//       )
//     }

//     // Update user's verification status
//     await User.updateOne({ _id: userId }, { verified: true })

//     // Remove verification data from database
//     await UserVerification.deleteOne({ userId })

//     // Redirect to verified page
//     res.redirect('/user/verified')
//   } catch (error) {
//     console.log(error)
//     res.redirect(
//       '/verified/error=true&message=An error occurred during email verification'
//     )
//   }
// })

// // Route to handle successful verification
// router.get('/verified', (req, res) => {
//   res.sendFile(path.join(__dirname, '../view/verified.html'))
// })

// // Route to handle user login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body

//     // Find user by email
//     const user = await User.findOne({ email })

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({
//         status: 'failed',
//         message: 'User not found',
//       })
//     }

//     // Check if user is verified
//     if (!user.verified) {
//       return res.status(401).json({
//         status: 'failed',
//         message: 'Email has not been verified yet. Check your email box.',
//       })
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, user.password)
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         status: 'failed',
//         message: 'Invalid password',
//       })
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: '1h',
//     })

//     res.status(200).json({
//       status: 'succeeded',
//       message: 'Login Success',
//       token: token,
//     })
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err.message,
//       token: null,
//     })
//   }
// })

// module.exports = router
