const { Op, Sequelize } = require('sequelize');
const { Product, ProductMedia, Rating } = require('../models');

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

const toMedia = (row) => ({
  role: row.role,
  kind: row.kind,
  position: row.position,
  path: row.path,
  poster: row.poster_path,
  alt: row.alt,
  label: row.label,
  caption: row.caption,
  width: row.width,
  height: row.height,
  crop: row.crop_left === null ? null : [row.crop_left, row.crop_top, row.crop_right, row.crop_bottom],
  focus: row.focus,
  tone: row.tone,
});

// Media is loaded in a second query: joining it into the grouped rating query
// would multiply rows and skew the average rating.
async function withMedia(products) {
  if (!products.length) return [];
  const rows = await ProductMedia.findAll({
    where: { product_id: products.map((product) => product.id) },
    order: [['product_id', 'ASC'], ['role', 'ASC'], ['position', 'ASC']],
  });
  return products.map((product) => ({
    ...product.toJSON(),
    media: rows.filter((row) => row.product_id === product.id).map(toMedia),
  }));
}

const getAllProducts = async () =>
  withMedia(await Product.findAll({
    ...summary,
    where: { category: { [Op.ne]: null }, retired_at: null },
    order: [['id', 'ASC']],
  }));

const getProductById = async (id) => {
  const product = await Product.findOne({ ...summary, where: { id } });
  return product ? (await withMedia([product]))[0] : null;
};

module.exports = { getAllProducts, getProductById };
