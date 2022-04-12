const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    name: String,
    image: String,
})

module.exports = mongoose.model('Game', GameSchema)