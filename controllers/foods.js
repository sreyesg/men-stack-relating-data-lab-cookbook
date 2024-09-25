const express = require('express')
const User = require('../models/user.js')
const router = express.Router()

// Index
router.get('/', async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        if(currentUser.pantry === null){
            res.send('There are no items to show')
        }else{
            res.render('foods/index.ejs', {
                foods: currentUser.pantry
                })
        }
    } catch (error) {
      console.log(error)
      res.redirect('/')  
    }
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

// Delete
router.delete('/:foodId', async(req, res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.id(req.params.foodId).deleteOne()
        currentUser.save()
        // redirect to index
        res.redirect(`/users/${req.session.user._id}/foods`)
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})



// Exports
module.exports = router