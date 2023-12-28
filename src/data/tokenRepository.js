const dbContext = require('../platform/db.js')
const schema = require('./schema.js')

module.exports.add = (tokenData) => {
    dbContext(schema.tables.tokens).insert(tokenData)
}

module.exports.getByUserIdAsync = async (userId) => {
    let columns = schema.tables.tokens.columns

    return await dbContext(schema.tables.tokens.name)
        .where(columns.user_id, userId)
        .select([
            columns.id,
            columns.access_token, 
            columns.refresh_token
        ])
}

module.exports.updateAsync = async (tokenId, tokenData) => {
    let columns = schema.tables.tokens.columns

    return await dbContext(schema.tables.tokens.name)
        .where(columns.id, tokenId)
        .update({
            access_token : tokenData.access_token,
        })
}