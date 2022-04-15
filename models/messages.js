const { attachment } = require('express/lib/response')
const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"        
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party", 
        required: true
    },
    messages : [messageSchema]    
},{timestamp: true})

module.exports = mongoose.model('MessageBoard', partyBoardSchema)