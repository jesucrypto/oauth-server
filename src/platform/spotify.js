const axios = require('axios')
const httpsService = require('../common/services/http.js') 
const spotifyApiEndpoints = require('../common/constants/spotifyApiEndpoints.js')

module.exports.getUserProfile = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.SPOTIFY_PROFILE_ENDPOINT, accessToken)
}

module.exports.getUserPlaylistsAsync = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.SPOTIFY_PLAYLISTS_ENDPOINT, accessToken)
}

module.exports.getPlaylistTracksAsync = async function(playlistId, accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.SPOTIFY_PLAYLIST_ITEMS.replace('<ID>', playlistId), accessToken)
}

module.exports.createPlaylistAsync = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.SPOTIFY_PLAYLIST_ITEMS(playlistId), accessToken)
}

module.exports.addTracksToPlaylistAsync = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.SPOTIFY_PLAYLIST_ITEMS, accessToken)
}