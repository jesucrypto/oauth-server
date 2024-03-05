const spotify = require('../../platform/spotify.js')
const usecases = require('../../usecase/accessToken.js')

class Playlist {

    constructor(name, id) {
        this.name = name
        this.id = id
    }

    async load(username) {
        let accessToken = await usecases.getUserAccessTokenAsync(username)
        let {data: tracks} = await spotify.getPlaylistTracksAsync(this.id, accessToken)
        this.tracks = tracks.items
        this.total = tracks.total

        return this
    }

    getTracklist() {
        return this.tracks
    }

    getTotal() {
        return this.total
    }
}

module.exports = Playlist