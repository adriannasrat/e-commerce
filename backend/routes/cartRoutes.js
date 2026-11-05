const express = require('express');
const { requireUser } = require('../auth/session');
const { wrap } = require('../http');
const cartService = require('../services/cartService');

// Every route acts on the signed-in user's own cart; no route takes a user id.
const router = express.Router();
router.use(requireUser);

router.get('/', wrap(async (req, res) => {
  res.json(await cartService.getCart(req.user.id));
}));

router.put('/items/:productId', wrap(async (req, res) => {
  res.json(await cartService.setItemAmount(req.user.id, Number(req.params.productId), req.body.amount));
}));

module.exports = router;
