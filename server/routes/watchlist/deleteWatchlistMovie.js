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

router.delete('/:username/watchlist/:movie_id', async (req, res) => {
  try {
    const { username, movie_id } = req.params

    const user_id = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    )

    const deleteQuery =
      'DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2'
    const result = await client.query(deleteQuery, [
      user_id.rows[0].id,
      movie_id,
    ])

    if (result.rowCount === 0) {
      return res.status(404)
    }

    res.status(200)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

module.exports = router
