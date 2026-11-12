const { Op, Sequelize } = require('sequelize');
const { Product, Rating } = require('../models');

const attributes = [
  'id',
  'slug',
  'title',
  'tagline',
  'finish_name',
  'category',
  'description',
  'price_ore',
  'imageUrl',
  'stock_quantity',
  [Sequelize.fn('IFNULL', Sequelize.fn('AVG', Sequelize.col('Ratings.rating')), 0), 'average_rating'],
];

const summary = { attributes, include: [{ model: Rating, attributes: [] }], group: ['Product.id'] };

const getAllProducts = () =>
  Product.findAll({
    ...summary,
    where: { category: { [Op.ne]: null }, retired_at: null },
    order: [['id', 'ASC']],
  });
const getProductById = (id) => Product.findOne({ ...summary, where: { id } });

module.exports = { getAllProducts, getProductById };
