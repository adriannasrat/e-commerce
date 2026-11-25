const { createHash } = require('node:crypto');
const { Op } = require('sequelize');
const { HttpError } = require('../http');
const { SignInFailure } = require('../models');

// Repeated guessing is slowed down in two ways. One email address from one
// network address gets a few tries, so nobody can lock another person out by
// guessing from elsewhere. One network address gets more tries across all
// accounts, so trying many accounts is slowed too. Failures count for a short
// window, and a successful sign-in clears that pair's count.
const WINDOW_MS = 15 * 60 * 1000;
const PER_ACCOUNT = 5;
const PER_ADDRESS = 20;

// Only digests are stored, never an email address or a network address.
const digest = (value) => createHash('sha256').update(value).digest('hex');
const keys = (email, address) => ({ email_hash: digest(email), address_hash: digest(address || 'unknown') });

async function oldestBeyond(where, limit, since) {
  const failures = await SignInFailure.findAll({
    where: { ...where, createdAt: { [Op.gt]: since } },
    order: [['createdAt', 'DESC']],
    limit,
    attributes: ['createdAt'],
  });
  return failures.length >= limit ? failures[limit - 1].createdAt : null;
}

// Refuses with 429 and Retry-After while either limit is reached.
async function assertSignInAllowed(email, address, now = new Date()) {
  const { email_hash: emailHash, address_hash: addressHash } = keys(email, address);
  const since = new Date(now - WINDOW_MS);
  const blockedFrom = [
    await oldestBeyond({ email_hash: emailHash, address_hash: addressHash }, PER_ACCOUNT, since),
    await oldestBeyond({ address_hash: addressHash }, PER_ADDRESS, since),
  ].filter(Boolean);
  if (!blockedFrom.length) return;
  // The wait lasts until the failure that reached the limit leaves the window.
  const until = Math.max(...blockedFrom.map((time) => time.getTime() + WINDOW_MS));
  const seconds = Math.max(1, Math.ceil((until - now.getTime()) / 1000));
  const minutes = Math.ceil(seconds / 60);
  throw new HttpError(
    429,
    `Too many sign-in attempts. Try again in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}.`,
    { 'Retry-After': String(seconds) },
  );
}

async function recordFailedSignIn(email, address, now = new Date()) {
  await SignInFailure.create({ ...keys(email, address), createdAt: now });
  // Failures older than the window no longer count, so they are let go.
  await SignInFailure.destroy({ where: { createdAt: { [Op.lt]: new Date(now - WINDOW_MS) } } });
}

async function clearFailedSignIns(email, address) {
  await SignInFailure.destroy({ where: keys(email, address) });
}

module.exports = { PER_ACCOUNT, PER_ADDRESS, assertSignInAllowed, clearFailedSignIns, recordFailedSignIn };
