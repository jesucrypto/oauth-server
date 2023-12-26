module.exports = {
    from : (tokenData) => {
        return {
            user_id : '',
            access_token : tokenData.access_token,
            refresh_token : tokenData.refresh_token
        }
    }
}