// Update with your config settings.
require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.STAGING_DB,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    },
  },

};
