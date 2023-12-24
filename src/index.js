const express = require('express')
const app = express();
const port = 8080
const settingNames = require('./common/constants/settingNames.js')
const appSettings = require('./settings.dev.json')
const secrets = require('./platform/secrets.js').getSecrets()

app.set(settingNames.DB_USER, secrets.dbUser)
app.set(settingNames.DB_PASSWORD, secrets.dbPassword)
app.set(settingNames.SPOTIFY_API_CLIENT_ID, secrets.spotifyApiClientId)
app.set(settingNames.SPOTIFY_API_CLIENT_SECRET, secrets.spotifyApiClientSecret)
app.set(settingNames.BASE_URL, appSettings.app.base_url)

const loginRoutes = require('./routes/loginRoutes.js')

app.use('/login', loginRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
