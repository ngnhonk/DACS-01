const knex = require('knex');
const config = require('./knex-config');

let db = knex(config.development);

module.exports = db;