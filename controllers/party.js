const express = require('express')
const db = require('../models')
const requiresToken = require('./requiresToken')
const router = express.Router()

//CREATE A PARTY
router.post('/:id', async (req, res)=>{

    const game = req.params.id

    const checkParty = await db.Party.findOne({
        name: req.body.name
    })
 
    if (checkGame) return res.status(409).json({ msg: 'A party name already' })

    const createParty = await db.Party.create({
        partyName: req.body.name,
        gameId: req.params.id,
        authorId: res.body.userId,
        
    })





})

module.exports = router
