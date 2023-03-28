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

//Imports
const loginRouter = require('./routes/Login')
const signupRouter = require('./routes/SignUp')
const userUpdate = require('./routes/userUpdate')
const userFavorites = require('./routes/favorites/favoriteMovie')
const getUserFavorites = require('./routes/favorites/getUserFavorites')
const deleteFavorite = require('./routes/favorites/deleteFavoriteMovie')
const userWatchlist = require('./routes/watchlist/watchlistMovie')
const getUserWatchlist = require('./routes/watchlist/getWatchlistMovie')
const deleteUserWatchlist = require('./routes/watchlist/deleteWatchlistMovie')

app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/:username/update', userUpdate)
app.use('/:username/favorites', userFavorites)
app.use('/:username/favorites', getUserFavorites)
app.use('/:username/favorites/:movie_id', deleteFavorite)
app.use('/:username/watchlist', userWatchlist)
app.use('/:username/watchlist', getUserWatchlist)
app.use('/:username/watchlist/:movie_id', deleteUserWatchlist)

/* Listen */
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`)
})

// //Post Image (Does not work yet)
// app.post('/users/:username/image', async (req, res) => {
//   const { username } = req.params
//   const { image } = req.body

//   const user = await client.query(
//     'SELECT id, image FROM users WHERE username = $1',
//     [username]
//   )

//   if (user.rows.length === 0) {
//     return res.status(404).json({ error: 'User not found' })
//   }

//   const user_id = user.rows[0].id
//   const user_image = user.rows[0].image

//   if (user_image) {
//     client.query(
//       'UPDATE users SET image = $1 WHERE id = $2',
//       [image, user_id],
//       (err, results) => {
//         if (err) {
//           throw err
//         }
//         if (results.rowCount > 0) {
//           res.status(200).json('Image has been updated')
//         }
//       }
//     )
//   } else {
//     client.query('INSERT INTO users (image) VALUES ($1)', [image])
//   }
// })
