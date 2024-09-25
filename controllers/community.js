const express = require('express')
const router = express.Router()
const User = require('../models/user.js')


router.get('/', async(req, res) => {
    const getAllUsers = await User.find()
    res.render('community/index.ejs',{
        community: getAllUsers
    })
})

// Show Page for single user's pantries
router.get('/:username', async(req,res) => {
    const member = await User.findOne({username: req.params.username})
    res.render('community/show.ejs', {
        member,
        pantry: member.pantry,
    })
})


module.exports = router