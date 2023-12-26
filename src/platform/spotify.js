const axios = require('axios')
const httpsService = require('../common/services/http.js') 
const spotifyApiEndpoints = require('../common/constants/spotifyApiEndpoints.js')

module.exports.getUserProfile = async function(accessToken) 
{
    return await httpsService
        .authorizedGet(spotifyApiEndpoints.SPOTIFY_PROFILE_ENDPOINT, accessToken)
}