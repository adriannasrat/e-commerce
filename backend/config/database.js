const { Sequelize } = require('sequelize');
const { readEnvironment } = require('./environment');

// Construction is side-effect free: server startup owns authentication.
module.exports = new Sequelize(readEnvironment().database);
