const path = require('node:path');
const dotenv = require('dotenv');

// Shell values take precedence, followed by the root and backend .env files.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

function readPort(value, fallback, name) {
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 65535) {
    throw new Error(`${name} must be an integer between 1 and 65535`);
  }
  return Number(value);
}

function readEnvironment(env = process.env) {
  return {
    port: readPort(env.PORT, 5000, 'PORT'),
    database: {
      database: env.DB_NAME || 'shop_db',
      username: env.DB_USER || 'root',
      password: env.DB_PASS,
      host: env.DB_HOST || 'localhost',
      port: readPort(env.DB_PORT, 3306, 'DB_PORT'),
      dialect: 'mariadb',
      logging: false,
    },
  };
}

module.exports = { readEnvironment };
