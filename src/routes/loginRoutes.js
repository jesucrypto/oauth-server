const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const querystring = require('querystring')
const scopes = require('../common/constants/authorizationScopes.js')
const spotifyApi = require('../common/constants/spotifyApiEndpoints.js')
const settingNames = require('../common/constants/settingNames.js')

router.get('/', (req, res) => {

    let state = crypto.randomBytes(16).toString('hex');
    let redirect_uri = `${req.app.get(settingNames.BASE_URL)}callback`

    var queryParams = querystring.stringify({
      response_type: 'code',
      client_id: req.app.get(settingNames.SPOTIFY_API_CLIENT_ID),
      scope: scopes.playlist_read_private,
      redirect_uri: redirect_uri,
      state: state
    });

    res.redirect(spotifyApi.authBaseUri + queryParams);
});

router.get('/callback', function(req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
    }
  });

  module.exports = router