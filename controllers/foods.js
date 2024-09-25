const express = require('express')
const User = require('../models/user.js')
const router = express.Router()

// Index
router.get('/', (req, res) => {
    res.render('foods/index.ejs')
})

// New Form
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
})

// Create
router.post('/', async (req, res) => {
    try {
        
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.push(req.body)
        
        currentUser.save()
        res.redirect(`/users/${req.session.user._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
        
    }
})
module.exports = router