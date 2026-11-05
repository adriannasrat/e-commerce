const path = require('node:path');
const { Umzug, SequelizeStorage } = require('umzug');

// Applied migrations are recorded in SequelizeMeta, so each runs only once.
function createMigrator(sequelize) {
  return new Umzug({
    migrations: { glob: path.join(__dirname, 'migrations/*.js').replace(/\\/g, '/') },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: undefined,
  });
}

module.exports = { createMigrator };
