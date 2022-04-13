const mongoose = require('mongoose')

const membersSchema = mongoose.Schema({
    userId : {
        type: String
    },
    admin : {
        type : Boolean,
        default: false
    }
}, {timestamps: true})

const requestsSchema = mongoose.Schema({
    userId : {
        type: String
    },
    message : {
        type : String,
        maxlength : 160
    }
}, {timestamps: true})

const partySchema = mongoose.Schema({
  gameId: {
    type: String,
    required: true
  },  
  partyName: {
      type: String,
      required : true
  },
  authorId : { //changes made by Justin
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },  
  description : {
    type: String,
    maxlength : 320
  },
  members : [membersSchema],
  requests : [requestsSchema]  
}, {timestamps: true})

module.exports = mongoose.model('Party', partySchema)