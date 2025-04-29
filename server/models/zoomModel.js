const mongoose = require('mongoose')

const zoomSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, default: 'Doctor Online' },
    roleType: { type: String, required: true, default: '1' },
    signature: { type: String, required: true },
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    date: { type: Date, required: true, default: new Date() },
    expDate: { type: Date, required: true, default: new Date() },
    time: { type: String, required: true },
  },
  { collection: 'Zoom' }
)

module.exports = mongoose.model('Zoom', zoomSchema)
