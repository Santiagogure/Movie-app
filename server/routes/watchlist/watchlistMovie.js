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

router.post('/:username/watchlist', async (req, res) => {
  try {
    const { username } = req.params
    const { movie_id, name, type } = req.body

    const user_id = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    )

    const query = 'SELECT * FROM watchlist WHERE user_id = $1 AND movie_id = $2'
    const result = await client.query(query, [user_id.rows[0].id, movie_id])
    if (result.rows.length > 0) {
      return res.status(400)
    }

    const insertQuery =
      'INSERT INTO watchlist (movie_id, user_id, name, type) VALUES ($1, $2, $3, $4)'
    await client.query(insertQuery, [movie_id, user_id.rows[0].id, name, type])

    res.status(201)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

module.exports = router
