const express = require('express')
const app = express();
const https = require('https')
const fs = require('fs')
const port = 8080
const appSettings = require('./settings.dev.json')
const utils = require('./common/services/utils.js')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const knex = require('./platform/db.js')
const loginRoutes = require('./routes/loginRoutes.js')
const appRoutes = require('./routes/appRoutes.js')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

setAppSecrets()

setViewEngine()

setSessionManager();

app.use(bodyParser.urlencoded({extended:false}))

app.use('/login', loginRoutes)

app.use('/', appRoutes)

if (process.env.ENVIRONMENT == 'DEV') {

    const key = fs.readFileSync(process.env.KEY_LOCATION)
    const cert = fs.readFileSync(process.env.CERT_LOCATION)
    const server = https.createServer({key : key, cert: cert}, app)
    
    server.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}
else {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}

function setSessionManager() {
    const sessionStore = new KnexSessionStore({
        knex,
        tablename: 'sessions'
    });

    app.use(session({
        secret: utils.generateRandomString(),
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60, secure: false },
        store: sessionStore
    }));
}

function setViewEngine() {
    app.engine('handlebars', engine());
    app.set("view engine", "handlebars");
    app.set("views", './public');
}

function setAppSecrets() {
    
    const settingNames = require('./common/constants/settingNames.js')
    const secrets = require('./platform/secrets.js').getSecrets()


    app.set(settingNames.DB_USER, secrets.DB_USER);
    app.set(settingNames.DB_PASSWORD, secrets.DB_PASSWORD);
    app.set(settingNames.SPOTIFY_API_CLIENT_ID, secrets.SPOTIFY_API_CLIENT_ID);
    app.set(settingNames.SPOTIFY_API_CLIENT_SECRET, secrets.SPOTIFY_API_CLIENT_SECRET);
    app.set(settingNames.BASE_URL, appSettings.app.base_url);
    app.set(settingNames.BASE_URL, appSettings.app.allowed_origin);
}

