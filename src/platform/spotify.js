const axios = require('axios')
const httpsService = require('../common/services/http.js') 
const spotifyApiEndpoints = require('../common/constants/spotifyApiEndpoints.js')
const grantTypes = require('../common/constants/grantTypes.js')
const settings = require('../settings.dev.json')
const { playlist_modify_private } = require('../common/constants/authorizationScopes.js')

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

module.exports.getAllUserPlaylistsAsync = async function(accessToken) 
{
    let {data : response} = await httpsService
        .authorizedGet(spotifyApiEndpoints.PLAYLISTS_ENDPOINT, accessToken)

    if (!response.next) {
        return response
    }

    let next = response.next

    let playlists = response.items

    do {

        let {data: nextResponse} = await httpsService.authorizedGet(next, accessToken)

        playlists = playlists.concat(nextResponse.items)

        next = nextResponse.next

    } while(next)

    return playlists
}

module.exports.getPlaylistTracksAsync = async function(playlistId, accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.PLAYLIST_TRACKS.replace('<ID>', playlistId), accessToken)
}

module.exports.getPlaylistTracksByUrlAsync = async function(url, accessToken) 
{
    return await httpsService
        .authorizedGet(url, accessToken)
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

module.exports.addTracksToPlaylistAsync = async function(accessToken, playlistId, trackUris, position = 0) 
{
    return await httpsService
        .authorizedPost(
            spotifyApiEndpoints.PLAYLIST_TRACKS.replace('<ID>', playlistId), 
            accessToken,
            {
                uris : trackUris,
                position : position
            }
        )
}