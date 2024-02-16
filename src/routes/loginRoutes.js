const express = require('express')
const router = express.Router()
const userLogin = require('../usecase/userLogin.js');

router.use(userLogin.checkForActiveSession)

router.get('/', userLogin.requestSpotifyAuthCode);

router.get('/callback', userLogin.createUser);

module.exports = router