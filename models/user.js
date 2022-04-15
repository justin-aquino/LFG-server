const mongoose = require('mongoose')


const User_game = mongoose.Schema({
  game_fk: String,   // obect ID of associated game
  username: String,
  gameName: String, // user input username for the game
})

const Joined_party = mongoose.Schema({
  party_fk: String,   // obect ID of associated party
})

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  games: [User_game],
  parties: [Joined_party],
  
  password: String
})

module.exports = mongoose.model('User', UserSchema)