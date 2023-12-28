const dbContext = require('../platform/db.js')
const tokenRepository = require('./tokenRepository.js')
const schema = require('./schema.js')

module.exports.add = async (user, tokens) => 
{
    try {

        await dbContext.transaction( async trx => {
            
            let userID = await trx.insert(user, ['id']).into(schema.tables.user.name)

            tokens.user_id = userID[0]

            await trx.insert(tokens).into(schema.tables.tokens.name)
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports.getByUsername = async (username) => 
{
    const userColumns = schema.tables.user.columns

    try {

        return await dbContext(schema.tables.user.name)
            .where(userColumns.spotify_display_name, username)
            .select(userColumns.id)

    } catch (error) {
        console.log(error)
    }
}