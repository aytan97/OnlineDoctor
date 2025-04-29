const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const commonUserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    status: { type: String, required: false, default: 'Pending' },
    role: { type: String, required: false },
    phoneNumber: { type: String, required: false, default: null },
    image: { type: Buffer, required: false, default: null },
    age: { type: Number },
    ssnId: { type: String, required: false },
    categories: { type: [String], required: false },
    languageSkills: { type: [String], required: false },
    workExperience: { type: String, required: false },
    currentWorkHospital: { type: String, required: false },
    biography: { type: String, required: false },
  },
  { collection: 'CommonUsers' }
)

commonUserSchema.pre('save', async function (next) {
  console.log('This is the categories data before saving:', this.categories)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  if (this.isModified('confirmPassword')) {
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 8)
  }

  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  if (!emailRegex.test(this.email)) {
    return next(new Error('Email is not valid'))
  }
  next()
})

module.exports.CommonUser = mongoose.model('CommonUser', commonUserSchema)
