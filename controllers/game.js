const express = require('express')
const db = require('../models')
const requiresToken = require('./requiresToken')
const router = express.Router()

// CREATE A GAME
router.post('/', async (req, res)=>{
    try{

        const checkGame = await db.Game.findOne({
            name: req.body.name
        })
     
        if (checkGame) return res.status(409).json({ msg: 'That game is already in the database' })
     
        const newGame = await db.Game.create({
            name: req.body.name,
            image: req.body.image
        })

        res.json(newGame)
    } catch(err){
        res.status(503).json({msg: "server error"})
    }

})


module.exports = router
