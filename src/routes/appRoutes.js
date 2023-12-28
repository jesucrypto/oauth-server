const express = require('express')
const settings = require('../settings.dev.json')
const router = express.Router()
const spotify = require('../platform/spotify.js')
const useCases = require('../usecase/authorizationToken.js')
const Playlist = require('../common/services/playlist.js')
const Mixer = require('../common/services/mixer.js')

router.get('/home', (req, res ) => {
    res.render('home')
})

router.get('/select-playlists', async (req, res) => {

    let authToken = await useCases.getUserAuthTokenAsync(req.session.userName)

    let { data : playlistData }  = await spotify.getUserPlaylistsAsync(authToken)

    let playlists = {
        playlists : playlistData.items
    }

    res.render('playlists', playlists)
})

router.post('/create-mix', async (req, res) => {
    
    // TODO: validate cookie exists
    let username = req.session.userName 

    let playlistData = getPlaylistData(req)

    let playlists = await getPlaylistsAsync(playlistData, username)

    let mix = getMix(playlists)

    uploadToSpotify(mix)
})

async function uploadToSpotify(mix) {
    spotify.createPlaylistAsync(name)

    spotify.addTracksToPlaylistAsync(mix)
}

function getMix(playlists) {
    let mixer = new Mixer(playlists)

    let mix = mixer.getMix()
    return mix
}

async function getPlaylistsAsync(playlistData, username) {
    let playlistEntities = []

    for (playlist of playlistData) {
        let playlistEntity = new Playlist(playlist.name, playlist.id)

        playlistEntities.push(await playlistEntity.load(username))
    }
    return playlistEntities
}

function getPlaylistData(req) {
    let playlists = []
    let ids = req.body
    for (let name in ids) {
        playlists.push({ name: name, id: ids[name] })
    }

    playlists = playlists.filter(p => p.id != 'Submit')

    return playlists
}

module.exports = router
