const knex = require('knex');
const knexConfig = require('../knexfile');
require('dotenv').config();

// Change config file based on environment
// default to 'development' if no .env
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexConfig[environment]);
