let utils = require('../services/utils.js')

module.exports = {
    from : (tokenData) => {
        
        let expirationDate = utils.getExpirationDate(tokenData.expires_in * 1000)
        
        return {
            user_id : '',
            access_token : tokenData.access_token,
            refresh_token : tokenData.refresh_token,
            expiration_date : expirationDate
        }
    }
}