const express = require('express')
const router = express.Router()
const { Client } = require('pg')
const multer = require('multer')
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

const storage = multer.memoryStorage()
const upload = multer({ storage })

client.connect()

router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
)

router.post(
  '/users/:username/image',
  upload.single('image'),
  async (req, res) => {
    const { username } = req.params
    const { buffer } = req.file

    try {
      await client.query('UPDATE users SET image = $1 WHERE username = $2', [
        buffer,
        username,
      ])
      res.status(200).send('Imagen upload correctly')
    } catch (error) {
      console.error(error)
      res.status(500).send('Error with the image')
    }
  }
)

router.get('/users/:username/image', async (req, res) => {
  const { username } = req.params

  try {
    const result = await client.query(
      'SELECT image FROM users WHERE username = $1',
      [username]
    )

    if (result.rowCount === 0) {
      res.status(404).send('User not found')
    } else {
      const imageData = result.rows[0].image
      res.setHeader('Content-Type', 'image/jpeg') // Establecer el tipo de contenido de la respuesta
      res.send(imageData) // Enviar los datos de la imagen como respuesta
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error retrieving the image')
  }
})

module.exports = router
