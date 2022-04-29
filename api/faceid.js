const express = require('express')
const faceapi = require('face-api.js')

const router = express.Router()

module.exports = router

router.post('/register', async (req, res) => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('../weights')
})
