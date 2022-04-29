const express = require('express')
const jwt = require('jsonwebtoken')

const jwtCheck = require('../middleware/jwt-check')

const router = express.Router()

module.exports = router

router.post('/signin', async (req, res) => {
  try {
    let user = await req.db('user')
      .where('username', req.body.username)
      .where('password', req.body.password)
      .then(rows => rows[0])

    if (!user) {
      throw new Error('Username or Password incorrect')
    }

    let data = {
      id: user.id,
      user: user.username,
    }
    let token = jwt.sign(data, req.config.jwt.secret, req.config.jwt.options)

    res.send({
      ok: 1,
      token,
    })
  } catch (e) {
    res.send({
      ok: 0,
      error: e.message,
    })
  }
})

router.get('/profile', jwtCheck, async (req, res) => {
  try {
    let user = await req.db('user')
      .where('id', req.token.id)
      .then(rows => rows[0])
    res.send({
      ok: 1,
      profile: user,
    })
  } catch (e) {
    res.send({
      ok: 0,
      error: e.message,
    })
  }
})
