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
            columns.refresh_token,
            columns.expiration_date
        ])
}

module.exports.updateAsync = async (tokenId, accessToken) => {
    let columns = schema.tables.tokens.columns

    return await dbContext(schema.tables.tokens.name)
        .where(columns.id, tokenId)
        .update({
            access_token : accessToken
        })
}

module.exports.updateAsync = async (tokenId, accessToken, refresh_token) => {
    let columns = schema.tables.tokens.columns

    return await dbContext(schema.tables.tokens.name)
        .where(columns.id, tokenId)
        .update({
            access_token : accessToken,
            refresh_token : refresh_token 
        })
}

module.exports.updateAsync = async (tokenId, accessToken, refreshToken, expirationDate) => {
    let columns = schema.tables.tokens.columns

    return await dbContext(schema.tables.tokens.name)
        .where(columns.id, tokenId)
        .update({
            access_token : accessToken,
            refresh_token : refreshToken,
            expiration_date : expirationDate
        })
}

module.exports.updateAsync = async (tokenId, tokenEntity) => {
    
    let columns = schema.tables.tokens.columns

    return await dbContext(schema.tables.tokens.name)
        .where(columns.id, tokenId)
        .update({
            access_token : tokenEntity.access_token,
            refresh_token : tokenEntity.refresh_token,
            expiration_date : tokenEntity.expiration_date
        })
}