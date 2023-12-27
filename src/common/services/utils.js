const crypto = require('crypto')

module.exports.generateRandomString = () => {
    return crypto.randomBytes(16).toString('hex');
}