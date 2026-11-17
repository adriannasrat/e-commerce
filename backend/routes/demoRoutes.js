const { createHash, timingSafeEqual } = require('node:crypto');
const express = require('express');
const { startSession } = require('../auth/session');
const { readEnvironment } = require('../config/environment');
const { HttpError, wrap } = require('../http');
const { createDemoUser, resetDemoData } = require('../services/demoService');
const { toPublicUser } = require('../services/userService');

const router = express.Router();
const digest = (value) => createHash('sha256').update(value).digest();

// Vercel Cron sends the project's CRON_SECRET as a bearer token. Digests have
// equal lengths, so the comparison takes the same time whatever was sent.
function isScheduledCall(req) {
  const secret = readEnvironment().cronSecret;
  const sent = req.headers.authorization || '';
  return Boolean(secret) && timingSafeEqual(digest(sent), digest(`Bearer ${secret}`));
}

router.post('/sign-in', wrap(async (req, res) => {
  const user = await createDemoUser();
  await startSession(res, user.id);
  res.status(201).json(toPublicUser(user));
}));

// Vercel Cron only sends GET requests.
router.get('/reset', wrap(async (req, res) => {
  if (!isScheduledCall(req)) throw new HttpError(401, 'Not allowed');
  await resetDemoData();
  res.status(204).end();
}));

module.exports = router;
