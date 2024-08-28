const express = require('express');
const staticRouter = express.Router();
const URL = require('../models/url')

staticRouter.get('/', async (req,res) => {
    const allUrls = await URL.find({})
    return res.render('home', {
        urls: allUrls
    })
})


module.exports = staticRouter