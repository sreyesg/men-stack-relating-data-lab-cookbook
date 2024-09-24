const express = require('express')
const User = require('../models/user.js')
const router = express.Router

router.get('/', (req, res) => {
    res.render('foods/index.ejs')
})




module.exports = router