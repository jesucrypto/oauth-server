const userRepository = require('../data/userRepository.js')
const tokenRepository = require('../data/tokenRepository.js')
const spotifyEndpoints = require('../common/constants/spotifyApiEndpoints.js')
const grantTypes = require('../common/constants/grantTypes.js')
const utils = require('../common/services/utils.js')
const querystring = require('querystring')
const axios = require('axios')

module.exports.getUserAccessTokenAsync = async (username) => {
    
    let userId = await userRepository.getByUsernameAsync(username)

    let token = (await tokenRepository.getByUserIdAsync(userId[0].id))[0]

    let expirationDate = parseInt(token.expiration_date)
    
    let now = Date.now()

    if ( expirationDate < now )
    {
        // TODO: spotify does not send new refresh token?

        let {data : tokenData } = await getRefreshTokenAsync(token.refresh_token)

        let expirationDate = utils.getExpirationDate(tokenData.expires_in)

        await tokenRepository.updateAsync(
            token.id, 
            tokenData.access_token,
            expirationDate
        )

        return tokenData.access_token
    }

    return token.access_token
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