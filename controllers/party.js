require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../models')
const { route } = require('./users')

// List all parties
router.get('/', async (req, res) => {
    try {
        const listParties = await db.Party.find({})
        res.json(listParties)
    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})

// display the individual party
router.get('/:id', async (req, res) => {
    try {
        const findParties = await db.Party.find({ gameId: req.params.id })
        res.json(findParties)
    } catch (error) {

    }
})
// TODO : push author id to membersSchema
//CREATE NEW PARTY
router.post('/', async (req, res) => {
    try {
        const partyCreated = await db.Party.create(req.body)
        const foundUser = await db.User.findById(
            req.body.members[0].userId
        )
        foundUser.parties.push({
            party_fk: partyCreated._id,

            partyName: partyCreated.partyName,
            partyDescription: partyCreated.description
        })
        await foundUser.save()
        res.json(partyCreated, foundUser)

    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})


// Update party
router.put('/:id', async (req, res) => {
    try {
        const partyUpdated = await db.Party.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(partyUpdated)
    } catch (error) {
        res.status(503).json({ msg: `An error occured.${error}` })
    }
})

// Request to join party -- will be pushed to requestsSchema
// TODO : check if userid already exists in the requestsSchema
router.put('/:id/request', async (req, res) => {
    try {
        const newRequest = await db.Party.findById(req.params.id)
        newRequest.requests.push(req.body)
        newRequest.save()
        return res.json({ newRequest, msg: 'Request submitted.' })
    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})

// display all requests
router.get('/:id/request', async (req, res) => {
    try {
        const pendingRequests = await db.Party.findById(req.params.id)
        res.json(pendingRequests)
    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})

// Approve application to join party  -- will be pushed to membersSchema
// TODO : delete request once
router.put('/:id/approve', async (req, res) => {
    try {
        const foundParty = await db.Party.findById(req.params.id)
        const foundUser = await db.User.findById(req.body.userId)
        foundParty.members.push(req.body)
        foundUser.parties.push({
            party_fk: foundParty._id,
            partyName: foundParty.partyName,
            partyDescription: foundParty.description
        })

        for (const prop in foundParty.requests) {
            if (foundParty.requests[prop]._id == req.body._id) {
                foundParty.requests.splice(prop, 1)

            }
        }

        await foundUser.save()
        await foundParty.save()
        return res.json({ foundParty, msg: 'User approved.' })
    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error}` })
    }
})

// decline a request
router.put('/:id/decline', async (req, res) => {
    try {
        const foundParty = await db.Party.findById(req.params.id)
        for (const prop in foundParty.requests) {            
            if (foundParty.requests[prop]._id == req.body._id)
                foundParty.requests.splice(prop, 1)
        }
        await foundParty.save()
        return res.json({ foundParty, msg: 'User declined.' })
    } catch (error) {
        console.log(error)
        res.status(503).json({ msg: `An error occured. ${error} ${req.params.id}` })
    }
})

// kick a member
router.put('/:id/kick', async (req, res) => {
    try {
        const foundParty = await db.Party.findById(req.params.id)
        const foundUser = await db.User.findById(
            req.body.userId
        )
        for (const prop in foundParty.members) {
            if (foundParty.members[prop].userId == req.body.userId)
                foundParty.members.splice(prop, 1)
        }
        await foundParty.save()
        return res.json({ foundParty, msg: 'User kicked.' })
    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error} ${req.params.id}` })
    }
})

// delete an existing party
router.delete('/:id', async (req, res) => {
    try {
        const foundParty = await db.Party.findById(req.params.id)
        foundParty.delete()
        return res.status(200).json({ msg: 'Party deleted.' })
    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error} ${req.params.id}` })
    }
})

// assign co-admin
router.put('/:id/co-admin', async (req, res) => {
    try {
        const foundParty = await db.Party.findById(req.params.id)
        for (const prop in foundParty.members) {
            if (foundParty.members[prop].userId == req.body.userId) {
                foundParty.members[prop].admin = req.body.admin
            }
        }
        await foundParty.save()
        return res.json({ foundParty, msg: 'Assigning Success' })
    } catch (error) {
        res.status(503).json({ msg: `An error occured. ${error} ${req.params.id}` })
    }
})
module.exports = router
