const express = require('express');
const { endSession, requireUser, startSession } = require('../auth/session');
const { wrap } = require('../http');
const { authenticate, createUser, toPublicUser } = require('../services/userService');
const { removeDemoUser } = require('../services/demoService');

const router = express.Router();

router.post('/signup', wrap(async (req, res) => {
  const user = await createUser(req.body);
  await startSession(res, user.id);
  res.status(201).json(toPublicUser(user));
}));

router.post('/signin', wrap(async (req, res) => {
  const user = await authenticate(req.body);
  await startSession(res, user.id);
  res.json(toPublicUser(user));
}));

router.post('/signout', wrap(async (req, res) => {
  if (req.user) await removeDemoUser(req.user);
  await endSession(req, res);
  res.status(204).end();
}));

router.get('/me', requireUser, (req, res) => {
  res.json(toPublicUser(req.user));
});

module.exports = router;
