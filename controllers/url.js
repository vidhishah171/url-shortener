const shortid = require('shortid');
const URL = require('../models/url')

async function generateNewShortUrl(req,res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({error: 'URL is required!'})
    }
    const shortId = shortid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })
    return res.json({id: shortId})
}

async function getRedirectedUrl(req, res) {
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({shortId: shortId}, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl);
}


async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    generateNewShortUrl,
    getRedirectedUrl,
    getAnalytics
}