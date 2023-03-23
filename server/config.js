const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { Client } = require('pg')
const session = require('express-session')
const crypto = require('crypto')

const secretKey = crypto.randomBytes(32).toString('hex')

require('dotenv').config({ path: '../.env' })

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const port = process.env.API

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

client.connect()

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(bodyParser.json())
app.use(cors())

/* Login */
app.post('/login', (req, res) => {
  const { username, password } = req.body

  client.query(
    'SELECT * FROM users WHERE username=$1 AND password=$2',
    [username, password],
    (error, results) => {
      if (error) {
        throw error
      }

      if (results.rows.length > 0) {
        req.session.username = username
        req.session.password = password
        res.status(200).json({ username: username, password: password })
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' })
      }
    }
  )
})

// SignUp
app.post('/signup', (req, res) => {
  const { username, password } = req.body

  client.query(
    'SELECT * FROM users WHERE username=$1',
    [username],
    (error, results) => {
      if (error) {
        throw error
      }

      if (results.rows.length > 0) {
        res.status(409).json({ message: 'El usuario ya existe' })
      } else {
        client.query(
          'INSERT INTO users (username, password) VALUES ($1, $2)',
          [username, password],
          (error, results) => {
            if (error) {
              throw error
            }
            console.log(results)
            res.status(201).json({ message: 'Usuario registrado exitosamente' })
          }
        )
      }
    }
  )
})

//Post Image (Does not work yet)
app.post('/users/:username/image', async (req, res) => {
  const { username } = req.params
  const { image } = req.body

  const user = await client.query(
    'SELECT id, image FROM users WHERE username = $1',
    [username]
  )

  if (user.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' })
  }

  const user_id = user.rows[0].id
  const user_image = user.rows[0].image

  if (user_image) {
    client.query(
      'UPDATE users SET image = $1 WHERE id = $2',
      [image, user_id],
      (err, results) => {
        if (err) {
          throw err
        }
        if (results.rowCount > 0) {
          res.status(200).json('Image has been updated')
        }
      }
    )
  } else {
    client.query('INSERT INTO users (image) VALUES ($1)', [image])
  }
})

/* Update your username */
app.put('/users/:username/username', (req, res) => {
  const { username } = req.params
  const newUsername = req.body.username

  client.query(
    'UPDATE users SET username = $1 WHERE username = $2',
    [newUsername, username],
    (error, results) => {
      if (error) {
        throw error
      }

      if (results.rowCount >= 0) {
        res.status(200).json({ message: 'Username updated' })
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    }
  )
})

/* Add Favorite Movies */
app.post('/users/:username/favorites', async (req, res) => {
  try {
    const { username } = req.params
    const { movie_id, name, type } = req.body

    const user_id = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    )

    const query = 'SELECT * FROM favorites WHERE user_id = $1 AND movie_id = $2'
    const result = await client.query(query, [user_id.rows[0].id, movie_id])
    if (result.rows.length > 0) {
      return res.status(400)
    }

    const insertQuery =
      'INSERT INTO favorites (movie_id, user_id, name, type) VALUES ($1, $2, $3, $4)'
    await client.query(insertQuery, [movie_id, user_id.rows[0].id, name, type])

    res.status(201)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

/* Delete Favorite Movie */
app.delete('/users/:username/favorites/:movie_id', async (req, res) => {
  try {
    const { username, movie_id } = req.params

    const user_id = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    )

    const deleteQuery =
      'DELETE FROM favorites WHERE user_id = $1 AND movie_id = $2'
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

/* Get favoirte Movies*/
app.get('/users/:username/favorites', async (req, res) => {
  try {
    const { username } = req.params

    const query =
      'SELECT * FROM favorites WHERE user_id = (SELECT id FROM users WHERE username = $1)'

    const result = await client.query(query, [username])

    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

/* Add Watchlist Movies */
app.post('/users/:username/watchlist', async (req, res) => {
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
      return res
        .status(400)
        .send('La pelicula ya está en la lista de seguimiento del usuario')
    }

    const insertQuery =
      'INSERT INTO watchlist (movie_id, user_id, name, type) VALUES ($1, $2, $3, $4)'
    await client.query(insertQuery, [movie_id, user_id.rows[0].id, name, type])

    res.status(201).send('Pelicula agregada a la lista de seguimiento')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al agregar pelicula a la lista de seguimiento')
  }
})

/* Get watchlist moviess*/
app.get('/users/:username/watchlist', async (req, res) => {
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

app.delete('/users/:username/watchlist/:movie_id', async (req, res) => {
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

/* Listen */
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`)
})
