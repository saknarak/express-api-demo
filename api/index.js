const express = require('express')

const jwtCheck = require('../middleware/jwt-check')

const router = express.Router()

module.exports = router

router.use('/auth', require('./auth'))
router.use('/faceid', require('./faceid'))
