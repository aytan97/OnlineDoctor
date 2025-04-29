const mongoose = require('mongoose')
const sendMail = require('../services/mailService')
const MailTemplate = require('../templates/mailTemplate')
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
})

async function sendVerificationEmail(email, otp) {
  try {
    const template = new MailTemplate(otp)
    sendMail(
      email,
      'Welcome to Online Doctor',
      null,
      template.getTemplate('register')
    )
  } catch (error) {
    console.log('Error occurred while sending email: ', error)
    throw error
  }
}
otpSchema.pre('save', async function (next) {
  console.log('New document saved to the database')

  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp)
  }
  next()
})
module.exports = mongoose.model('OTP', otpSchema)
