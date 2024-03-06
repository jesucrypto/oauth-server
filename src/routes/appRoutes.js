const express = require('express')
const router = express.Router()
const createMixUseCase = require('../usecase/createMix.js')

router.get('/home', (req, res) => {
    res.render('home')
})

router.get('/profile', async (req, res) => {
    res.render('profile', {username : req.session.userName})
})

router.get('/select-playlists', createMixUseCase.selectPlaylists)

router.post('/create-mix', createMixUseCase.create)

module.exports = router
