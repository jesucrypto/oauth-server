const dbContext = require('../platform/db.js')
const schema = require('./schema.js')

module.exports.add = (tokenData) => {
    dbContext(schema.tables.tokens).insert(tokenData)
}