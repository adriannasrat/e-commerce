const { HttpError } = require('../http');
const { Product, Rating } = require('../models');

async function rateProduct(userId, productId, rating) {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new HttpError(400, 'Rating must be a whole number from 1 to 5');
  }
  if (!(await Product.findByPk(productId))) throw new HttpError(404, 'Product not found');
  await Rating.upsert({ product_id: productId, user_id: userId, rating });
  return { product_id: productId, rating };
}

module.exports = { rateProduct };
