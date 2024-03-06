const axios = require('axios')
const httpsService = require('../common/services/http.js') 
const spotifyApiEndpoints = require('../common/constants/spotifyApiEndpoints.js')
const grantTypes = require('../common/constants/grantTypes.js')
const settings = require('../settings.dev.json')

module.exports.getUserProfileAsync = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.PROFILE_ENDPOINT, accessToken)
}

module.exports.getAccessTokenAsync = async function (authorizationCode, clientID, clientSecret)
{
    // TODO: get this from settings
    let redirect_uri = `${settings.app.base_url}login/callback`

    return await axios.post
    (
        spotifyApiEndpoints.TOKEN_URI, 
        {
            code: authorizationCode,
            redirect_uri: redirect_uri,
            grant_type: grantTypes.AUTHORIZATION_CODE
        }, 
        {
            headers : {
                'content-type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + (new Buffer.from(clientID + ':' + clientSecret).toString('base64'))            
            }
        }
    )
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