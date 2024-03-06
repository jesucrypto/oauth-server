const spotifyClient = require('../platform/spotify.js')
const useCases = require('../usecase/accessToken.js')
const spotifyApiLimits = require('../common/constants/spotifyApiLimits.js')
const Playlist = require('../common/services/playlist.js')
const Mixer = require('../common/services/mixer.js')
const utils = require('../common/services/utils.js')

module.exports.selectPlaylists = async (req, res) => {

    let authToken = await useCases.getUserAccessTokenAsync(req.session.userName)

    let { data : playlistData }  = await spotifyClient.getUserPlaylistsAsync(authToken)

    res.render('playlists', { playlists : playlistData.items })
}

module.exports.create = async (req, res) => {
    
    // TODO: validate cookie exists
    let username = req.session.userName 

    let accessToken = await useCases.getUserAccessTokenAsync(username)

    let playlistData = getPlaylistData(req)

    let mixData = await getMixDataAsync(playlistData, accessToken)

    let mix = getMix(mixData)

    let spotifyMixData = await uploadToSpotify(mix, username, accessToken)

    res.render('mix', spotifyMixData)
}

async function uploadToSpotify(mix, userName, accessToken) {

    let playlistData = { name : mix.name, description : "descr", public : false}

    let newPlaylist = await spotifyClient.createPlaylistAsync(accessToken, userName, playlistData)

    let trackUris = mix.tracklist.map(m => m.uri);
        
    let numberOfPages = utils.getNumberOfPages(trackUris.length, spotifyApiLimits.maxTracksInRequest)

    for(let i = 1; i <= numberOfPages; i++) {
        
        let page = utils.paginate(trackUris, spotifyApiLimits.maxTracksInRequest, i)

        await spotifyClient.addTracksToPlaylistAsync(accessToken, newPlaylist.data.id, page)
    }

    return {
        name : newPlaylist.data.name,
        description : newPlaylist.data.description,
        image_url : "",
        tracklist : mix.tracklist
    }
}

function getMix(mixData) {

    let mixer = new Mixer(mixData.playlists, mixData.name)
    let mix = mixer.getMix()
    return mix
}

async function getMixDataAsync(playlistData, accessToken) {
    let playlistEntities = []

    for (playlist of playlistData.playlists) {
        
        let playlistEntity = new Playlist(playlist.name, playlist.id)

        playlistEntities.push(await playlistEntity.loadTracks(accessToken))
    }

    return { name : playlistData.name, playlists : playlistEntities }
}

function getPlaylistData(req) {
    let playlists = []
    let ids = req.body

    for (let name in ids) {
        if (name == 'NAME' || ids[name] == 'Submit') {
            continue;
        }

        playlists.push({ name: name, id: ids[name] })
    }

    let playlistData = {
        name : ids['NAME'],
        playlists : playlists
    }

    return playlistData
}