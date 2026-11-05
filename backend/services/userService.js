const { hashPassword, verifyPassword } = require('../auth/password');
const { HttpError } = require('../http');
const { User } = require('../models');

const MIN_PASSWORD_LENGTH = 8;
const normaliseEmail = (email) => email.trim().toLowerCase();
// Unknown emails cost the same work as wrong passwords, so timing reveals neither.
const unknownUserHash = hashPassword('unknown user');

const toPublicUser = ({ id, email }) => ({ id, email });

function readCredentials({ email, password } = {}) {
  if (typeof email !== 'string' || !email.includes('@') || typeof password !== 'string') {
    throw new HttpError(400, 'Email and password are required');
  }
  return { email: normaliseEmail(email), password };
}

async function createUser(body) {
  const { email, password } = readCredentials(body);
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new HttpError(400, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }
  try {
    return await User.create({ email, password: await hashPassword(password) });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpError(409, 'An account with this email already exists');
    }
    throw error;
  }
}

async function authenticate(body) {
  const { email, password } = readCredentials(body);
  const user = await User.findOne({ where: { email } });
  const valid = await verifyPassword(password, user ? user.password : await unknownUserHash);
  if (!user || !valid) throw new HttpError(401, 'Invalid email or password');
  return user;
}

module.exports = { authenticate, createUser, toPublicUser };
