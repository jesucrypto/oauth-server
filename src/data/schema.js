module.exports = {
    tables : {
        user : {
            name : 'user',
            columns : {
                id : 'id',
                spotify_user_id : 'spotify_user_id',
                spotify_user_uri : 'spotify_user_uri',
                spotify_display_name : 'spotify_display_name'
            }
        },
        tokens : 
        {
            name : 'tokens',
            columns : {
                id : 'id',
                user_id : 'user_id',
                access_token : 'access_token',
                refresh_token : 'refresh_token'
            }
        }
    }
}