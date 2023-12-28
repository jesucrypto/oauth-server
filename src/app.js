const express = require('express')
const app = express();
const port = 8080
const settingNames = require('./common/constants/settingNames.js')
const appSettings = require('./settings.dev.json')
const secrets = require('./platform/secrets.js').getSecrets()
const utils = require('./common/services/utils.js')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

app.set(settingNames.DB_USER, secrets.DB_USER)
app.set(settingNames.DB_PASSWORD, secrets.DB_PASSWORD)
app.set(settingNames.SPOTIFY_API_CLIENT_ID, secrets.SPOTIFY_API_CLIENT_ID)
app.set(settingNames.SPOTIFY_API_CLIENT_SECRET, secrets.SPOTIFY_API_CLIENT_SECRET)
app.set(settingNames.BASE_URL, appSettings.app.base_url)
app.set(settingNames.BASE_URL, appSettings.app.allowed_originß)

const knex = require('./platform/db.js')
const loginRoutes = require('./routes/loginRoutes.js')
const appRoutes = require('./routes/appRoutes.js')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const sessionStore = new KnexSessionStore({
    knex, 
    tablename: 'sessions'
})

app.engine('handlebars', engine())
app.set("view engine", "handlebars");
app.set("views", './public');

app.use(session({
    secret: utils.generateRandomString(),
    resave : true,
    saveUninitialized: false,
    cookie : { maxAge : 1000 * 60 * 60, secure : false}, 
    store : sessionStore
}))
app.use(bodyParser.urlencoded({extended:false}))
app.use('/login', loginRoutes)
app.use('/', appRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
