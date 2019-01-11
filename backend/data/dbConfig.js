const knex = require('knex');
const knexConfig = require('../knexfile');

// Change config file based on environment
// default to 'development' if no .env
const environment = process.env.NODE_ENV || 'production';
console.log('env for dbconfig', environment, process.env.NODE_ENV);

module.exports = knex(knexConfig[environment]);
