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
const userImage = require('./routes/userImage')
const userFavorites = require('./routes/favorites/favoriteMovie')
const getUserFavorites = require('./routes/favorites/getUserFavorites')
const deleteFavorite = require('./routes/favorites/deleteFavoriteMovie')
const userWatchlist = require('./routes/watchlist/watchlistMovie')
const getUserWatchlist = require('./routes/watchlist/getWatchlistMovie')
const deleteUserWatchlist = require('./routes/watchlist/deleteWatchlistMovie')

app.use('', loginRouter)
app.use('', signupRouter)
app.use('', userUpdate)
app.use('', userImage)
app.use('', userFavorites)
app.use('', getUserFavorites)
app.use('', deleteFavorite)
app.use('', userWatchlist)
app.use('', getUserWatchlist)
app.use('', deleteUserWatchlist)

/* Listen */
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`)
})
