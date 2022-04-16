require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/:id', async (req, res) => {
    try {
        const msgRes = await db.MessageBoard.find({partyId : req.params.id})
        res.json(msgRes)
    } catch (error) {
        console.table(error)
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})
router.post('/', async (req, res) => {
    try {
        const msgRes = await db.MessageBoard.create(req.body)        
        res.json(msgRes)
    } catch (error) {
        console.log(error)
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})
router.put('/:id', async (req,res)=> {
    try {
        
        const msgRes = await db.MessageBoard.findById(req.params.id)        
        msgRes.messages.push(req.body)
        msgRes.save()
        res.json({msgRes, msg: 'Message inserted.'})
    } catch (error) {
        console.table(error)
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})

module.exports = router