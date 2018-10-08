const Knex = require('knex');
const knexConfigs = require('../knexfile');

const env = () => process.env.NODE_ENV || 'development';

const knexConfig = knexConfigs[env()];

module.exports = Knex(knexConfig);
