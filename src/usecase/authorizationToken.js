const userRepository = require('../data/userRepository.js')
const tokenRepository = require('../data/tokenRepository.js')
const spotifyEndpoints = require('../common/constants/spotifyApiEndpoints.js')
const grantTypes = require('../common/constants/grantTypes.js')
const utils = require('../common/services/utils.js')
const querystring = require('querystring')
const axios = require('axios')


module.exports.getUserAuthTokenAsync = async (username) => {
    
    let userId = await userRepository.getByUsernameAsync(username)

    let tokens = await tokenRepository.getByUserIdAsync(userId[0].id)

    if (/* access token is old*/true)
    {
        let {data : tokenData } = await getRefreshTokenAsync(tokens[0].refresh_token)

        await tokenRepository.updateAsync(tokens[0].id, tokenData.access_token)

        return tokenData.access_token
    }

    return tokens[0].access_token
}

async function getRefreshTokenAsync(refreshToken)
{
    return await axios.post(
        spotifyEndpoints.TOKEN_URI, {
            grant_type : grantTypes.REFRESH_TOKEN,
            refresh_token : refreshToken
        }, {
            headers : {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + utils.toBase64(process.env.SPOTIFY_API_CLIENT_ID + ':' + process.env.SPOTIFY_API_CLIENT_SECRET)
            }
        }
    )
}