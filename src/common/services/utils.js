const crypto = require('crypto')

module.exports.generateRandomString = () => {
    return crypto.randomBytes(16).toString('hex');
}

module.exports.getElapsedMssSince = (startDate) => {
    return new Date().valueOf() - startDate.valueOf()
}

module.exports.toBase64 = (string) => {
    return new Buffer.from(string).toString('base64')
}