const express = require('express')
const otpGenerator = require('otp-generator')
const OTP = require('../models/otpModel')
const User = require('../models/userModel')

const router = express.Router()

router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body

    const checkUserPresent = await User.findOne({ email })

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      })
    }
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
    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload)
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
})

module.exports = router

const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const OTP = require('../models/otpModel')

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, otp } = req.body

    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      })
    }

    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      })
    }
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
}
