module.exports = {
    SPOTIFY_ACCOUNTS_BASE_URI : 'https://accounts.spotify.com',
    SPOTIFY_API_BASE_URI : 'https://api.spotify.com',
    SPOTIFY_API_VERSION : 'v1',

    get AUTH_BASE_URI() { 
        return `${this.SPOTIFY_ACCOUNTS_BASE_URI}/authorize?` 
    },

    get TOKEN_URI() { 
        return `${this.SPOTIFY_ACCOUNTS_BASE_URI}/api/token` 
    },

    get PROFILE_ENDPOINT() { 
        return `${this.SPOTIFY_API_BASE_URI}/${this.SPOTIFY_API_VERSION}/me` 
    },

    get PLAYLISTS_ENDPOINT() {
        return `${this.PROFILE_ENDPOINT}/playlists`
    },

    get PLAYLIST_TRACKS() {
        return `${this.SPOTIFY_API_BASE_URI}/${this.SPOTIFY_API_VERSION}/playlists/<ID>/tracks`
    },

    get CREATE_PLAYLIST() {
        return `${this.SPOTIFY_API_BASE_URI}/${this.SPOTIFY_API_VERSION}/users/<USERID>/playlists`
    }
}