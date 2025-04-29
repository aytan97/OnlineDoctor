const mongoose = require('mongoose')
const bcyrpt = require('bcryptjs')

const UserVerificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    uniqueString: { type: String, required: true, unique: true },
    createdAt: { type: Date },
    expiresAt: { type: Date },
  },
  { collection: 'UserVerifications' }
)

module.exports = mongoose.model('UserVerification', UserVerificationSchema)
