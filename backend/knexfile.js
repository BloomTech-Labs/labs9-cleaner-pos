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
      directory: './data/seeds',
    },
  },

  testmem: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './data/devdb.sqlite3',
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
