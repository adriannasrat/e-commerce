const express = require('express');
const { requireUser } = require('../auth/session');
const { HttpError, wrap } = require('../http');
const productService = require('../services/productService');
const { rateProduct } = require('../services/ratingService');

const router = express.Router();

router.get('/', wrap(async (req, res) => {
  res.json(await productService.getAllProducts());
}));

router.get('/:id', wrap(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) throw new HttpError(404, 'Product not found');
  res.json(product);
}));

router.post('/:id/ratings', requireUser, wrap(async (req, res) => {
  res.status(201).json(await rateProduct(req.user.id, Number(req.params.id), req.body.rating));
}));

module.exports = router;
