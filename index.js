require('dotenv').config()
require('./models')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const db = require('./models')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT || 3001

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const myMiddleWare = (req, res, next) => {
  console.log(`Incoming request: ${req.method} - ${req.url}`)
  // move along there
  next()
}

// app.use(myMiddleWare) 

app.get('/', (req, res) => {
  res.json({ msg: 'LOOKING FOR GROUP!' })
})


// controllers
app.use('/users', require('./controllers/users'))
app.use('/game', require('./controllers/game'))
app.use('/party', require('./controllers/party'))

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`)
})