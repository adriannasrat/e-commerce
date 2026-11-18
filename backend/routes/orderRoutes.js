const express = require('express');
const { requireUser } = require('../auth/session');
const { wrap } = require('../http');
const orderService = require('../services/orderService');

// Every route acts on the signed-in user's own orders; no route takes a user id.
const router = express.Router();
router.use(requireUser);

router.get('/', wrap(async (req, res) => {
  res.json(await orderService.getOrders(req.user.id));
}));

router.post('/', wrap(async (req, res) => {
  res.status(201).json(await orderService.placeOrder(req.user.id, req.body.cartId));
}));

module.exports = router;
