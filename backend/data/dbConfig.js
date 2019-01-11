const knex = require('knex');
const knexConfig = require('../knexfile');

// Change config file based on environment
// default to 'development' if no .env
const environment = process.env.NODE_ENV || 'production';

module.exports = knex(knexConfig[environment]);
