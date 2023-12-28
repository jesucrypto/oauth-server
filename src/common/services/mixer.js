const Playlist = require("./playlist");

class Mixer {
    
    constructor(playlists) 
    {
        this.playlists = playlists
    }

    getMix()
    {
        let longestPlaylist = this.playlists
            .reduce((acc, playlist) => acc.getTotal() >= playlist.getTotal() ? acc : playlist, 
            this.playlists[0])
        
        let newTracklist = []

        while(longestPlaylist.getTracklist().length > 0) {

            for (let playlist of this.playlists) {

                if (playlist.getTracklist().length <= 0) continue

                let { track }  = playlist.getTracklist().pop()
                newTracklist.unshift({
                    parent : playlist.name, 
                    name : track.name,
                    artist : track.artists[0].name,
                    uri : track.uri
                })
            }
        }

        return newTracklist.reverse()
    }
}

module.exports = Mixer