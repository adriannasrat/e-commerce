const { createHash, randomBytes } = require('node:crypto');
const { Op } = require('sequelize');
const { readEnvironment } = require('../config/environment');
const { HttpError } = require('../http');
const { Session, User } = require('../models');

const COOKIE = 'session';
const LIFETIME_MS = 14 * 24 * 60 * 60 * 1000;
// Only a digest is stored, so a database leak does not expose live sessions.
const digest = (token) => createHash('sha256').update(token).digest('hex');
const cookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: readEnvironment().secureCookies,
  path: '/',
});

function readToken(req) {
  const match = (req.headers.cookie || '').match(/(?:^|;\s*)session=([a-f0-9]{64})(?:;|$)/);
  return match && match[1];
}

async function startSession(res, userId) {
  const token = randomBytes(32).toString('hex');
  await Session.create({
    user_id: userId,
    token_hash: digest(token),
    expires_at: new Date(Date.now() + LIFETIME_MS),
  });
  res.cookie(COOKIE, token, { ...cookieOptions(), maxAge: LIFETIME_MS });
}

async function endSession(req, res) {
  const token = readToken(req);
  if (token) await Session.destroy({ where: { token_hash: digest(token) } });
  res.clearCookie(COOKIE, cookieOptions());
}

async function loadUser(req, res, next) {
  try {
    const token = readToken(req);
    const session = token && await Session.findOne({
      where: { token_hash: digest(token), expires_at: { [Op.gt]: new Date() } },
      include: [User],
    });
    req.user = session ? session.User : null;
    next();
  } catch (error) {
    next(error);
  }
}

function requireUser(req, res, next) {
  next(req.user ? undefined : new HttpError(401, 'Sign in required'));
}

module.exports = { endSession, loadUser, requireUser, startSession };
