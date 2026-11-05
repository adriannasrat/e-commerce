const { randomBytes, scrypt, timingSafeEqual } = require('node:crypto');
const { promisify } = require('node:util');

const derive = promisify(scrypt);
const KEY_LENGTH = 64;
const PREFIX = 'scrypt$';

const isHashed = (value) => value.startsWith(PREFIX);

async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await derive(password, salt, KEY_LENGTH);
  return `${PREFIX}${salt.toString('base64')}$${key.toString('base64')}`;
}

async function verifyPassword(password, stored) {
  const [, salt, key] = stored.split('$');
  const expected = Buffer.from(key, 'base64');
  const actual = await derive(password, Buffer.from(salt, 'base64'), KEY_LENGTH);
  return timingSafeEqual(actual, expected);
}

module.exports = { hashPassword, isHashed, verifyPassword };
