const express = require('express')
const cors = require('cors')
const knex = require('knex')

const config = require('./config')

const app = express()
const db = knex(config.db)

app.use(express.static('/public'))
app.use(cors())
app.use((req, res, next) => {
  req.db = db
  req.config = config
  next()
})

app.use('/api', express.json(), require('./api'))

app.listen(config.server.port, () => {
  console.log('ready', config.server.port)
})
