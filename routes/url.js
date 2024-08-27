const express = require('express');
const { generateNewShortUrl, getRedirectedUrl, getAnalytics } = require('../controllers/url');

const router = express.Router();

router.post('/', generateNewShortUrl);

router.get("/:id", getRedirectedUrl)

router.get('/analytics/:shortId', getAnalytics)

module.exports = router;