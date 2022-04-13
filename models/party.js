const mongoose = require('mongoose')




const membersSchema = mongoose.Schema({
    userId: { //changes made by Justin
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    admin : {
        type : Boolean,
        default: false //this will automatically change if you're the creator of party.
    }
}, {timestamps: true})

const requestsSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isApproved: { //when request is sent, default is false. if false, hide components accessible only to approved members.
        type: Boolean,
        default: false
    },
    message : {
        type : String,
        maxlength : 160
    }
}, {timestamps: true})

const partySchema = mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game", //references the Game Schema
    required: true
  },  
  partyName: {
      type: String,
      required : true
  },
//   authorId : { //changes made by Justin
//       type: mongoose.Schema.Types.ObjectId, //have to use .populate on controller to find the user by id
//       ref: "User"
//   },  
  description : {
    type: String,
    maxlength : 320
  },
  members : [membersSchema],
  requests : [requestsSchema] 
}, {timestamps: true})

module.exports = mongoose.model('Party', partySchema)