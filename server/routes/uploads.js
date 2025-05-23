const express = require('express')
const router = express.Router()
const upload = require('../services/upload')

router.post('/upload-image/', upload.single('image'), async (req, res) => {
  if (req.file) {
    res.json({
      success: true,
      message: 'Image uploaded',
      file: req.file.filename,
    })
  } else {
    res.status(400).send({
      success: false,
      message: 'Image not uploaded',
    })
  }
})

module.exports = router
