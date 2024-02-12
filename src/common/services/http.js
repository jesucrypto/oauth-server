const axios = require('axios')

module.exports.authorizedGet = async function(url, accessToken)
{
    return await axios({
        method : 'get',
        url : url,
        headers : { Authorization : `Bearer ${accessToken}`}
    })
}

module.exports.authorizedPost = async function(url, accessToken, data)
{
    return await axios({
        method : 'post',
        url : url,
        headers : { 
            Authorization : `Bearer ${accessToken}`,
            'Content-Type' : 'application/json' 
        },
        data : data
    })
}