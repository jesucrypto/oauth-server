module.exports.user = {
    from : (spotifyData) => {
        return {
            spotify_user_id : spotifyData.id,
            spotify_uri : spotifyData.uri,
            spotify_display_name : spotifyData.display_name
        }
    }
}