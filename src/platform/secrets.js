module.exports.getSecrets = function()
{
    let env = process.env
    
    return {
        DB_USER : env.DB_USER,
        DB_PASSWORD : env.DB_PASSWORD,
        SPOTIFY_API_CLIENT_ID : env.SPOTIFY_API_CLIENT_ID,
        SPOTIFY_API_CLIENT_SECRET : env.SPOTIFY_API_CLIENT_SECRET
    }
}