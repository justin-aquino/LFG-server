const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    name: String,
    image: String,
    icon: String,
    platform: [String],
    genre: [String],
    developer: String,
    type: String
})

module.exports = mongoose.model('Game', GameSchema) 