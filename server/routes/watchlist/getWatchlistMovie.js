const express = require('express')
const router = express.Router()
const { Client } = require('pg')
const session = require('express-session')
const crypto = require('crypto')

const secretKey = crypto.randomBytes(32).toString('hex')

require('dotenv').config({ path: '../.env' })

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

client.connect()

router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
)

router.get('/:username/watchlist', async (req, res) => {
  try {
    const { username } = req.params

    const query =
      'SELECT * FROM watchlist WHERE user_id = (SELECT id FROM users WHERE username = $1)'

    const result = await client.query(query, [username])

    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al obtener lista de seguimiento')
  }
})

module.exports = router
