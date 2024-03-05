const crypto = require('crypto')

module.exports.generateRandomString = () => {
    return crypto.randomBytes(16).toString('hex');
}

module.exports.getElapsedMssSince = (startDate) => {
    return new Date().valueOf() - startDate.valueOf()
}

module.exports.toMilliseconds = (seconds) => {
    return seconds * 1000
}

module.exports.toBase64 = (string) => {
    return new Buffer.from(string).toString('base64')
}

module.exports.getExpirationDate = (expiresIn, bufferInMss = 5000) => {
    let expirationDate =  (Date.now() + expiresIn) - bufferInMss
    return expirationDate.toString()
}