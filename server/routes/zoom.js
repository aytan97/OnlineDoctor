const express = require('express')
const router = express.Router()
const middleware = require('../middleware/zoommiddleware')
const Zoom = require('../models/zoomModel')

router.post('/generate', middleware.generateToken, (req, res) => {
  console.log(res.locals.signature)
  const newZoom = new Zoom({
    signature: res.locals.signature,
    expDate: res.locals.expDate,
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    date: req.body.date,
    time: req.body.time,
  })

  newZoom
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.json({ message: err }))
})

module.exports = router
