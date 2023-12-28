const axios = require('axios')

module.exports.authorizedGet = async function(url, accessToken)
{
    return await axios({
        method : 'get',
        url : url,
        headers : { Authorization : `Bearer ${accessToken}`}
    })
}