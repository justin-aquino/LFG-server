const mongoose = require('mongoose')


const User_game = mongoose.Schema({
  game_fk: String,   // obect ID of associated game
  username: String,
  gameName: String, // user input username for the game
})

const Joined_party = mongoose.Schema({
  party_fk: String,   // changed by ajmel
  partyName: String,  // changed by jamel
  partyDescription: String   // changed by jamel
})

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  games: [User_game],
  parties: [Joined_party],
  
  password: String
})

module.exports = mongoose.model('User', UserSchema)