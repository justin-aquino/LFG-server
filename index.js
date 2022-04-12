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
  console.log(`incoming request: ${req.method} - ${req.url}`)
  // move along there
  next()
}

app.use(myMiddleWare)

app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the user app 👋' })
})

// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users'))

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`)
})