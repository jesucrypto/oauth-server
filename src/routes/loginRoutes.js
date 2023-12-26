const express = require('express')
const settings = require('../settings.dev.json')
const router = express.Router()
const crypto = require('crypto')
const querystring = require('querystring')
const cors = require('cors')
const axios = require('axios')
const scopes = require('../common/constants/authorizationScopes.js')
const spotifyService = require('../platform/spotify.js')
const userRepository = require('../data/userRepository.js')
const spotifyDataConverter = require('../common/converters/spotifyDataConverter.js')
const tokenDataConverter = require('../common/converters/tokenDataConverter.js')
const spotifyApi = require('../common/constants/spotifyApiEndpoints.js')
const settingNames = require('../common/constants/settingNames.js')
const grantTypes = require('../common/constants/grantTypes.js')

let corsOptions = 
{
  origin : 'http://localhost:5173',
  optionSuccessStatus : 200
}

let redirect_uri = `${settings.app.base_url}login/callback`

router.get('/', cors(corsOptions), (req, res) => {

    let state = crypto.randomBytes(16).toString('hex');

    var queryParams = querystring.stringify({
      response_type: 'code',
      client_id: req.app.get(settingNames.SPOTIFY_API_CLIENT_ID),
      scope: scopes.playlist_read_private,
      redirect_uri: redirect_uri,
      state: state
    });

    res.redirect(spotifyApi.SPOTIFY_AUTH_BASE_URI + queryParams);
});

router.get('/callback', async function(req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null/* TODO: validate state */) {
      
      await redirectError(res)

      return;
    } 

    let {data: tokenData} = await requestAccessToken(
      code,
      req.app.get(settingNames.SPOTIFY_API_CLIENT_ID),
      req.app.get(settingNames.SPOTIFY_API_CLIENT_SECRET)
    )

    let {data: spotifyProfileData} = await spotifyService.getUserProfile(tokenData.access_token)

    let { userEntity, tokenEntity } = getUserAndTokenEntities(spotifyProfileData, tokenData)
    
    await userRepository.add(userEntity, tokenEntity)
  });
  
function getUserAndTokenEntities(spotifyProfileData, tokenData) {
  
  let userEntity = spotifyDataConverter.user.from(spotifyProfileData)

  let tokenEntity = tokenDataConverter.from(tokenData)

  return { userEntity, tokenEntity }
}

async function requestAccessToken(authorizationCode, clientID, clientSecret)
{
  return await axios.post
  (
    spotifyApi.SPOTIFY_TOKEN_URI, 
    {
      code: authorizationCode,
      redirect_uri: redirect_uri,
      grant_type: grantTypes.AUTHORIZATION_CODE
    }, 
    {
      headers : {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(clientID + ':' + clientSecret).toString('base64'))            
      }
    }
  )
}

async function redirectError(res)
{
  let errorParam = querystring.stringify({ error: 'state_mismatch'})
  res.redirect('/#' + errorParam);
}

module.exports = router