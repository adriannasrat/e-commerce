const express = require('express');
const { requireUser } = require('../auth/session');
const { wrap } = require('../http');
const orderService = require('../services/orderService');

// Every route acts on the signed-in user's own orders; no route takes a user id.
const router = express.Router();

// Where Stripe sends the visitor back: the storefront they ordered from. In
// development the storefront and the API are on different ports.
function siteOrigin(req) {
  const origin = req.get('origin');
  return origin && /^https?:\/\/[\w.:-]+$/.test(origin) ? origin : `${req.protocol}://${req.get('host')}`;
}
router.use(requireUser);

router.get('/', wrap(async (req, res) => {
  res.json(await orderService.getOrders(req.user.id));
}));

router.get('/:orderId', wrap(async (req, res) => {
  res.json(await orderService.getOrder(req.user.id, Number(req.params.orderId)));
}));

router.post('/', wrap(async (req, res) => {
  res.status(201).json(await orderService.placeOrder(req.user.id, req.body, siteOrigin(req)));
}));

router.post('/:orderId/payment', wrap(async (req, res) => {
  res.json(await orderService.resumePayment(req.user.id, Number(req.params.orderId)));
}));

router.post('/:orderId/cancel', wrap(async (req, res) => {
  res.json(await orderService.returnToBag(req.user.id, Number(req.params.orderId)));
}));

module.exports = router;
