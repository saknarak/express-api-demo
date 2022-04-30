require('@tensorflow/tfjs-node')
const faceapi = require('@vladmandic/face-api')

const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })

module.exports = {
  loadModel,
  faceapi,
  faceDetectionOptions,
}

async function loadModel(dir) {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(dir)
  console.log('faceid model loaded')
}
