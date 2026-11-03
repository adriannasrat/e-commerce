const { readEnvironment } = require('./environment');

module.exports = {
  development: readEnvironment().database,
};
