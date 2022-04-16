const { attachment } = require('express/lib/response')
const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    userId : {
        type: String,
        ref: "User"        
    },
    userName : {
        type : String
    },
    message: {
        type: String                
    },
    attachmentLink : {
        type : String
    }
},{timestamp: true})

const partyBoardSchema = mongoose.Schema({
    partyId : {
        type: String,
        ref: "Party", 
        required: true
    },
    messages : [messageSchema]    
},{timestamp: true})

module.exports = mongoose.model('MessageBoard', partyBoardSchema)