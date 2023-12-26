const express = require('express')
const app = express();
const port = 8080
const settingNames = require('./common/constants/settingNames.js')
const appSettings = require('./settings.dev.json')
const secrets = require('./platform/secrets.js').getSecrets()

app.set(settingNames.DB_USER, secrets.DB_USER)
app.set(settingNames.DB_PASSWORD, secrets.DB_PASSWORD)
app.set(settingNames.SPOTIFY_API_CLIENT_ID, secrets.SPOTIFY_API_CLIENT_ID)
app.set(settingNames.SPOTIFY_API_CLIENT_SECRET, secrets.SPOTIFY_API_CLIENT_SECRET)
app.set(settingNames.BASE_URL, appSettings.app.base_url)
app.set(settingNames.BASE_URL, appSettings.app.allowed_originß)

const loginRoutes = require('./routes/loginRoutes.js')

app.use('/login', loginRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
