const { Sequelize } = require('sequelize');
const mariadb = require('mariadb');
const { readEnvironment } = require('./environment');

// Construction is side-effect free: server startup owns authentication.
// The driver is passed in, since Sequelize otherwise loads it by name at runtime,
// which bundlers such as Vercel's cannot see and so leave out.
module.exports = new Sequelize({ ...readEnvironment().database, dialectModule: mariadb });
