const spotifyClient = require('../../platform/spotify.js')
const usecases = require('../../usecase/accessToken.js')

class Playlist {

    constructor(name, id) {
        this.name = name
        this.id = id
    }

    async loadTracks(accessToken) {
        
        this.tracks = []

        let {data: tracks} = await spotifyClient.getPlaylistTracksAsync(this.id, accessToken)
        
        this.tracks = tracks.items
        
        if (tracks.next) {
            
            let next = tracks.next

            do { 

                let { data : nextTracks } = await spotifyClient.getPlaylistTracksByUrlAsync(next, accessToken)
                
                this.tracks = this.tracks.concat(nextTracks.items)

                next = nextTracks.next

            } while(next)
        }

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