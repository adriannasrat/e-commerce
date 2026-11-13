const path = require('node:path');
const dotenv = require('dotenv');

// Shell values take precedence, followed by the root and backend .env files.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// Loaded after the .env files, so the logger sees LOG_LEVEL and NODE_ENV from them.
const { LOG_LEVELS } = require('../logger');

// Every problem is collected before failing, so one start shows them all.
// Messages name variables, never their values, which may be secrets.
class ConfigurationError extends Error {
  constructor(problems) {
    super(`Invalid configuration: ${problems.join('; ')}`);
    this.name = 'ConfigurationError';
    this.problems = problems;
  }
}

const NODE_ENVS = ['development', 'test', 'production'];
// Names people reach for that this API does not read.
const MISSPELLINGS = { DB_PASSWORD: 'DB_PASS', DB_PASSWD: 'DB_PASS', DATABASE_PASSWORD: 'DB_PASS' };

function readEnvironment(env = process.env) {
  const problems = [];

  const port = (name, fallback) => {
    const value = env[name];
    if (value === undefined) return fallback;
    if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 65535) {
      problems.push(`${name} must be an integer between 1 and 65535`);
      return fallback;
    }
    return Number(value);
  };
  const text = (name, fallback) => {
    const value = env[name];
    if (value === undefined) return fallback;
    if (value.trim() === '') problems.push(`${name} must not be empty`);
    return value;
  };

  const flag = (name) => {
    const value = env[name];
    if (value === undefined) return false;
    if (value !== 'true' && value !== 'false') problems.push(`${name} must be true or false`);
    return value === 'true';
  };

  const nodeEnv = env.NODE_ENV ?? 'development';
  if (!NODE_ENVS.includes(nodeEnv)) {
    problems.push(`NODE_ENV must be one of ${NODE_ENVS.join(', ')}`);
  }
  if (env.LOG_LEVEL !== undefined && !LOG_LEVELS.includes(env.LOG_LEVEL)) {
    problems.push(`LOG_LEVEL must be one of ${LOG_LEVELS.join(', ')}`);
  }
  for (const [wrong, right] of Object.entries(MISSPELLINGS)) {
    if (env[wrong] !== undefined && env[right] === undefined) {
      problems.push(`${wrong} is not read; set ${right} instead`);
    }
  }

  const config = {
    port: port('PORT', 5001),
    secureCookies: nodeEnv === 'production',
    database: {
      database: text('DB_NAME', 'shop_db'),
      username: text('DB_USER', 'root'),
      password: env.DB_PASS,
      host: text('DB_HOST', 'localhost'),
      port: port('DB_PORT', 3306),
      dialect: 'mariadb',
      logging: false,
    },
  };
  // Hosted databases require TLS. The certificate is verified against the
  // system's trusted authorities.
  if (flag('DB_SSL')) config.database.dialectOptions = { ssl: { rejectUnauthorized: true } };

  // Local defaults suit development only. A deployed API names its database.
  if (nodeEnv === 'production') {
    for (const name of ['DB_HOST', 'DB_PASS']) {
      if (!env[name]) problems.push(`${name} is required in production`);
    }
  }

  if (problems.length) throw new ConfigurationError(problems);
  return config;
}

module.exports = { ConfigurationError, readEnvironment };
