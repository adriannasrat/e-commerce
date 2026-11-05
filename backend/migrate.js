const sequelize = require('./config/database');
const { createMigrator } = require('./migrator');

createMigrator(sequelize)
  .up()
  .then((applied) => {
    console.log(`Applied ${applied.length} migration(s).`);
  })
  .catch((error) => {
    // Print only the message: driver errors can carry connection details.
    console.error(`Migration failed: ${error.cause?.message || error.message}`);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
