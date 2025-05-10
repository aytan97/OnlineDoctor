const path = require('path')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { CommonUser } = require('../models/commonUser')
const OTP = require('../models/otpModel')
const otpGenerator = require('otp-generator')
const router = express.Router()
const userValidationRules = require('../validations/userValidation')
const validateUser = require('../middleware/validateUser')
const getUser = require('../middleware/getUser')
const { default: mongoose } = require('mongoose')
require('dotenv').config()
const MailTemplate = require('../templates/mailTemplate')
const sendMail = require('../services/mailService')
const fs = require('fs')
const ObjectId = mongoose.Types.ObjectId
const pendingUsers = {}
const tokenOptions = {
  expiresIn: '1d',
}

const imagePath = path.join(__dirname, '../public/avatar.png')
const imageBuffer = fs.readFileSync(imagePath)

const base64ImageDefault = imageBuffer.toString('base64')

const defaultImageBase64 = `data:image/jpeg;base64,${base64ImageDefault}`
router.post('/', userValidationRules(), validateUser, async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      ssnId,
      categories,
      password,
      confirmPassword,
      email,
      role,
      age,
      phoneNumber,
      image,
    } = req.body

    const existingUser = await CommonUser.findOne({ email })
    if (existingUser) {
      if (existingUser.status === 'Active') {
        return res.status(400).json({
          success: false,
          message: 'User already exists and is activated',
        })
      } else {
        return res.status(400).json({
          success: false,
          message:
            'User already exists but is not activated. Please check your email for OTP.',
        })
      }
    }

    let userImage

    if (
      image &&
      typeof image === 'string' &&
      /^data:image\/\w+;base64,/.test(image)
    ) {
      const base64Image = image.split(';base64,').pop()
      const imageBuffer = Buffer.from(base64Image, 'base64')
      userImage = imageBuffer
    } else {
      userImage = Buffer.from(
        base64ImageDefault.split(';base64,').pop(),
        'base64'
      )
    }

    pendingUsers[email] = {
      firstname,
      lastname,
      password,
      confirmPassword,
      email,
      role,
      phoneNumber,
      image: userImage,
      age,
      ...(role === 'doctor' && {
        ssnId,
        categories,
      }),
    }
    const otp = await generateOTP()

    await sendOTP(email, otp)

    await OTP.create({ email, otp })

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully. Please verify your email with OTP.',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
})

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Both email and otp are required for OTP verification',
      })
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      })
    }

    const userDetails = pendingUsers[email]

    await CommonUser.create({
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      password: userDetails.password,
      confirmPassword: userDetails.confirmPassword,
      email: userDetails.email,
      role: userDetails.role,
      age: userDetails.age,
      phoneNumber: userDetails.phoneNumber,
      image: userDetails.image,
      ...(userDetails.role === 'patient' && {
        status: 'Active',
      }),
      ...(userDetails.role === 'doctor' && {
        ssnId: userDetails.ssnId,
        categories: userDetails.categories,
        status: 'Waiting',
      }),
    })

    delete pendingUsers[email]

    await OTP.deleteMany({ email })

    const template = new MailTemplate(
      userDetails.firstname,
      userDetails.lastname,
      userDetails.password
    )

    if (userDetails.role === 'doctor') {
      sendMail(
        email,
        'Welcome to Doctor Online',
        null,
        template.getTemplate('welcomeDoctor')
      )
    } else {
      sendMail(
        email,
        'Welcome to Doctor Online',
        null,
        template.getTemplate('welcome')
      )
    }
    return res.status(200).json({
      success: true,
      message: 'User registered successfully. Your account is now activated.',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
})

async function generateOTP() {
  try {
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    let result = await OTP.findOne({ otp: otp })
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      })
      result = await OTP.findOne({ otp: otp })
    }
    return otp
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

async function sendOTP(email, otp) {
  try {
    const otpPayload = { email, otp }
    await OTP.create(otpPayload)
    return {
      success: true,
      message: 'OTP sent successfully',
      otp,
    }
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await CommonUser.findOne({ email })

    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        status: 'failed',
        statusCode: 401,
        message: 'Invalid Username Or Password',
        token: '',
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log('Invalid password')
      return res.status(401).json({
        status: 'failed',
        statusCode: 401,
        message: 'Invalid Username Or Password',
        token: '',
      })
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      tokenOptions
    )

    const createdAt = Math.floor(Date.now() / 1000)
    const expiresInMilliseconds =
      createdAt + tokenOptions.expiresIn.split('d')[0] * 24 * 60 * 60
    const tokenExpirationDate = new Date(expiresInMilliseconds * 1000)

    return res.status(200).json({
      status: 'succeeded',
      statusCode: 200,
      message: 'Login Success',
      token: token,
    })
  } catch (err) {
    console.log('Error during login:', err)
    return res.status(500).json({
      status: 'failed',
      statusCode: 500,
      message: 'Internal Server Error',
      token: '',
    })
  }
})

router.get('/getMe', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 'failed',
        statusCode: 401,
        message: 'Authorization header is missing',
        data: null,
      })
    }

    const token = req.headers.authorization.split(' ')[1]

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const createdAt = decodedToken.iat * 1000
    const expiresInMilliseconds = createdAt + 24 * 60 * 60 * 1000
    const tokenExpirationDate = new Date(expiresInMilliseconds)

    const user = await CommonUser.findById(decodedToken.userId)

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        statusCode: 404,
        message: 'User not found',
        data: null,
      })
    }
    return res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'User details retrieved successfully',
      data: {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        categories: user.categories,
        age: user.age,
        phoneNumber: user.phoneNumber,
        languageSkills: user.languageSkills,
        workExperience: user.workExperience,
        currentWorkHospital: user.currentWorkHospital,
        biography: user.biography,
        image: user.image,
        role: user.role,
        status: user.status,
        token: token,
        expiresIn: tokenExpirationDate,
      },
    })
  } catch (error) {
    console.error('Error fetching user details:', error)
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'failed',
        statusCode: 401,
        message: 'Invalid token',
        data: null,
      })
    }
    return res.status(500).json({
      status: 'failed',
      statusCode: 500,
      message: 'Internal Server Error',
      data: null,
    })
  }
})

router.get('/:id', getUser, async (req, res) => {
  res.send(res.user)
})

router.get('/', async (req, res) => {
  try {
    const users = await CommonUser.find().populate('')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/update-status/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid user ID' })
    }

    const user = await CommonUser.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    return res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      user,
    })
  } catch (error) {
    console.error('Error updating user status:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
})

router.patch('/:userId', async (req, res) => {
  const userId = req.params.userId
  const updateFields = req.body

  try {
    const user = await CommonUser.findById(userId)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    user.firstname = updateFields.firstname || user.firstname
    user.lastname = updateFields.lastname || user.lastname
    user.email = updateFields.email || user.email
    user.phoneNumber = updateFields.phoneNumber || user.phoneNumber
    user.age = updateFields.age || user.age
    user.status = updateFields.status || user.status

    if (req.body.image !== undefined && req.body.image !== null) {
      if (user.image && user.image.data) {
        await user.image.remove()
      }
      const base64Image = req.body.image.split(';base64,').pop()
      const imageBuffer = Buffer.from(base64Image, 'base64')
      user.image = imageBuffer
    }

    if (user.role === 'doctor') {
      user.ssnId = updateFields.ssnId || user.ssnId
      user.categories = updateFields.categories || user.categories
      user.languageSkills = updateFields.languageSkills || user.languageSkills
      user.workExperience = updateFields.workExperience || user.workExperience
      user.currentWorkHospital =
        updateFields.currentWorkHospital || user.currentWorkHospital
      user.biography = updateFields.biography || user.biography
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      user,
    })
  } catch (error) {
    console.error('Error updating user profile:', error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const deletedUser = await CommonUser.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      message: 'User deleted successfully',
      deletedUserId: deletedUser._id,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
