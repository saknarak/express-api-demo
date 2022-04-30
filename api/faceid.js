const fs = require('fs')
const tf = require('@tensorflow/tfjs-node')
const express = require('express')
const faceapi = require('@vladmandic/face-api')

const router = express.Router()

module.exports = router

const minConfidence = 0.15
const maxResults = 5
const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence, maxResults })

router.post('/register', async (req, res) => {
  const buffer = fs.readFileSync('./public/images/bbt1.jpg')
  const tensor = tf.tidy(() => {
    const decode = faceapi.tf.node.decodeImage(buffer, 3)
    let expand
    if (decode.shape[2] === 4) {
      const channels = faceapi.tf.split(decode, 4, 2)
      const rgb = faceapi.tf.stack([channels[0], channels[1], channels[2]], 2)
      expand = faceapi.tf.reshape(rgb, [1, decode.shape[0], decode.shape[1], 3])
    } else {
      expand = faceapi.tf.expandDims(decode, 0)
    }
    const cast = faceapi.tf.cast(expand, 'float32')
    return cast
  })
  const detections = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet)

  console.log('detections=', detections)
  res.send({
    ok: 1,
    detections,
  })
})
