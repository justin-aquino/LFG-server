require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../models')

// List all parties
router.get('/', async(req,res) =>{
    try {
        const listParties = await db.Party.find({})
        res.json(listParties)
    } catch (error) {
        console.log(error)
        res.status(503).json({ msg: `An error occured.${error}` })
    }            
})



// Create a party
// TODO : push author id to membersSchema
router.post('/', async (req, res)=>{
    try {
        const partyCreated = await db.Party.create(req.body)        
        await partyCreated.save()
        res.json(partyCreated)
    } catch (error) {
        console.log(error)
        res.status(503).json({ msg: `An error occured.${error}` })
    }
})

// Update party
router.put('/:id', async (req, res)=> {
    try {
        const partyUpdated = await db.Party.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        )        
        res.json(partyUpdated)
    } catch (error) {
        console.log(error)
        res.status(503).json({ msg: `An error occured.${error}` })
    }
})

// Request to join party -- will be pushed to requestsSchema
router.put('/:id/request', async (req,res) => {
    try {
        const newRequest = await db.Party.findById(req.params.id)
        newRequest.requests.push(req.body)
        await newRequest.save()
    } catch (error) {
        console.log(error)
        res.status(503).json({ msg: `An error occured.${error}` })
    }
})

module.exports = router
