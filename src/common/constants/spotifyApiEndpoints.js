module.exports = {
    SPOTIFY_ACCOUNTS_BASE_URI : 'https://accounts.spotify.com',
    SPOTIFY_API_BASE_URI : 'https://api.spotify.com',
    SPOTIFY_API_VERSION : 'v1',
    get SPOTIFY_AUTH_BASE_URI() { 
        return `${this.SPOTIFY_ACCOUNTS_BASE_URI}/authorize?` 
    },
    get SPOTIFY_TOKEN_URI() { 
        return `${this.SPOTIFY_ACCOUNTS_BASE_URI}/api/token` 
    },
    get SPOTIFY_PROFILE_ENDPOINT() { 
        return `${this.SPOTIFY_API_BASE_URI}/${this.SPOTIFY_API_VERSION}/me` 
    }
}