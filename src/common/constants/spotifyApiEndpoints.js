module.exports = {
    SPOTIFY_BASE_URI : 'https://accounts.spotify.com',
    SPOTIFY_AUTH_BASE_URI : `${this.SPOTIFY_BASE_URI}/authorize?`,
    SPOTIFY_TOKEN_URI : `${this.SPOTIFY_AUTH_BASE_URI}/api/token`
}