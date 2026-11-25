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
    // Authorizes the nightly demo reset. Unset, the reset refuses every call.
    cronSecret: text('CRON_SECRET', undefined),
    // Unset, checkout and the payment webhook answer that payments are not set up.
    stripe: {
      secretKey: text('STRIPE_SECRET_KEY', undefined),
      webhookSecret: text('STRIPE_WEBHOOK_SECRET', undefined),
      // Only the end-to-end tests set this, to reach a local stand-in for Stripe.
      apiUrl: text('STRIPE_API_URL', undefined),
    },
    database: {
      database: text('DB_NAME', 'shop_db'),
      username: text('DB_USER', 'root'),
      password: env.DB_PASS,
      host: text('DB_HOST', 'localhost'),
      port: port('DB_PORT', 3306),
      dialect: 'mariadb',
      logging: false,
      // The driver's one-second default is too short for a hosted database
      // that sleeps when idle and needs a few seconds to wake.
      dialectOptions: { connectTimeout: 10000 },
    },
  };
  // Hosted databases require TLS. The certificate is verified against the
  // system's trusted authorities.
  if (flag('DB_SSL')) config.database.dialectOptions.ssl = { rejectUnauthorized: true };

  // The demo never takes real money, so only Stripe test-mode keys are accepted.
  const stripeKey = env.STRIPE_SECRET_KEY;
  if (stripeKey && !/^(sk|rk)_test_/.test(stripeKey)) {
    problems.push('STRIPE_SECRET_KEY must be a test-mode key');
  }
  // A deployed API always talks to Stripe itself.
  if (env.STRIPE_API_URL !== undefined) {
    if (nodeEnv === 'production') problems.push('STRIPE_API_URL must not be set in production');
    else if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(env.STRIPE_API_URL)) {
      problems.push('STRIPE_API_URL must be a local http address with a port');
    }
  }

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
