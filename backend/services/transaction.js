const { Transaction } = require('sequelize');
const sequelize = require('../config/database');

// Row locks do the protecting here. A waiting lock must then see the latest
// committed row, which MariaDB's REPEATABLE READ refuses with error 1020.
const inTransaction = (work) =>
  sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED }, work);

module.exports = { inTransaction };
