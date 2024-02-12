const axios = require('axios')
const httpsService = require('../common/services/http.js') 
const spotifyApiEndpoints = require('../common/constants/spotifyApiEndpoints.js')

module.exports.getUserProfile = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.PROFILE_ENDPOINT, accessToken)
}

module.exports.getUserPlaylistsAsync = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.PLAYLISTS_ENDPOINT, accessToken)
}

module.exports.getPlaylistTracksAsync = async function(playlistId, accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.PLAYLIST_TRACKS.replace('<ID>', playlistId), accessToken)
}

module.exports.createPlaylistAsync = async function(accessToken, userId, playlistData) 
{
    return await httpsService
        .authorizedPost(
            spotifyApiEndpoints.CREATE_PLAYLIST.replace('<USERID>', userId), 
            accessToken,
            playlistData
        )
}

module.exports.addTracksToPlaylistAsync = async function(accessToken, playlistId, trackUris) 
{
    return await httpsService
        .authorizedPost(
            spotifyApiEndpoints.PLAYLIST_TRACKS.replace('<ID>', playlistId), 
            accessToken,
            {
                uris : trackUris,
                position : 0 
            }
        )
}