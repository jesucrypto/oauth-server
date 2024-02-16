const userRepository = require('../data/userRepository.js')
const tokenRepository = require('../data/tokenRepository.js')
const spotifyDataConverter = require('../common/converters/spotifyDataConverter.js')
const tokenDataConverter = require('../common/converters/tokenDataConverter.js')
const crypto = require('crypto')
const scopes = require('../common/constants/authorizationScopes.js')
const settingNames = require('../common/constants/settingNames.js')
const settings = require('../settings.dev.json')
const querystring = require('querystring')
const spotifyApi = require('../common/constants/spotifyApiEndpoints.js')
const spotifyClient = require('../platform/spotify.js')

// TODO: make this a setting.
let redirect_uri = `${settings.app.base_url}login/callback`

module.exports.checkForActiveSession = (req, res, next) => {

    if (req.session.userName) 
    {
      res.redirect(`${settings.app.base_url}profile`)
  
      return
    }
  
    next()
}

module.exports.requestSpotifyAuthCode = (req, res) => {

    let state = crypto.randomBytes(16).toString('hex');

    req.session.state = state

    var queryParams = querystring.stringify({
      response_type: 'code',
      client_id: req.app.get(settingNames.SPOTIFY_API_CLIENT_ID),
      scope: `${scopes.playlist_read_private} ${scopes.playlist_modify_public} ${scopes.playlist_modify_private}`,
      redirect_uri: redirect_uri,
      state: state
    });

    res.redirect(spotifyApi.AUTH_BASE_URI + queryParams);
}

module.exports.createUser = async function(req, res) {
  
    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null || req.session.state != state) {
        
        await redirectError(res)

        return;
    } 

    let {data: tokenData} = await spotifyClient.getAccessTokenAsync
    (
        code,
        req.app.get(settingNames.SPOTIFY_API_CLIENT_ID),
        req.app.get(settingNames.SPOTIFY_API_CLIENT_SECRET)
    )

    let {data: spotifyProfileData} = await spotifyClient.getUserProfile(tokenData.access_token)

    req.session.userName = spotifyProfileData.display_name

    let userlookupResult = (await userRepository.getByUsernameAsync(req.session.userName))[0]

    if (userlookupResult) {

        await updateAccessTokenAsync(userlookupResult.id, tokenData.access_token, tokenData.refresh_token)

    } else {

        await createRecordAsync(spotifyProfileData, tokenData)
    }

    res.redirect(`${settings.app.base_url}profile`)
}

async function createRecordAsync(spotifyProfileData, tokenData) {
    
    let { userEntity, tokenEntity } = getUserAndTokenEntities(spotifyProfileData, tokenData)
  
    await userRepository.addAsync(userEntity, tokenEntity)
}

async function updateAccessTokenAsync(userId, accessToken, refresh_token) {

    let tokens = (await tokenRepository.getByUserIdAsync(userId))[0]

    await tokenRepository.updateAsync(tokens.id, accessToken, refresh_token)
}

function getUserAndTokenEntities(spotifyProfileData, tokenData) {
  
    let userEntity = spotifyDataConverter.user.from(spotifyProfileData)
  
    let tokenEntity = tokenDataConverter.from(tokenData)
  
    return { userEntity, tokenEntity }
}

async function redirectError(res)
{
  let errorParam = querystring.stringify({ error: 'state_mismatch'})
  res.redirect('/#' + errorParam);
}