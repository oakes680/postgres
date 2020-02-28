const knex = require("knex");

const configOptions = require("../knexfile").production;

const enivironment = process.env.DB_ENV || "development"

module.exports = knex(configOptions[environment]);