const pino = require('pino');

const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'];

// JSON lines for hosts and log tools. In a development terminal the same
// lines are printed readably instead. An invalid LOG_LEVEL falls back to info
// here; configuration validation reports it at startup.
function createLogger(env = process.env, destination) {
  const level = LOG_LEVELS.includes(env.LOG_LEVEL) ? env.LOG_LEVEL : 'info';
  const readable = !destination && env.NODE_ENV !== 'production' && process.stdout.isTTY;
  const transport = readable
    ? { target: 'pino-pretty', options: { translateTime: 'HH:MM:ss', ignore: 'pid,hostname' } }
    : undefined;
  return pino({ level, transport }, destination);
}

module.exports = { LOG_LEVELS, createLogger, logger: createLogger() };
