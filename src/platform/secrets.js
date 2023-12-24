module.exports.getSecrets = function()
{
    let env = process.env
    
    return {
        dbUser : env.DB_USER,
        dbPassWord : env.DB_PASSWORD,
        spotifyApiClientId : env.SPOTIFY_API_CLIENT_ID,
        spotifyApiSecret : env.SPOTIFY_API_SECRET
    }
}