const settings = require('../settings.dev.json');
const knex = require('knex')
(
    {
        client : 'mysql',
        connection : 
        {
            host : settings.db.host,
            port : 3306,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        }
    }
)

module.exports = knex