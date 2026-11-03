const express = require('express');
const cors = require('cors');
const path = require('node:path');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cartRowRoutes = require('./routes/cartRowRoutes');
const productRoutes = require('./routes/productRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

function createApp() {
  const app = express();
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  app.use('/users', userRoutes);
  app.use('/carts', cartRoutes);
  app.use('/cart_rows', cartRowRoutes);
  app.use('/products', productRoutes);
  app.use('/ratings', ratingRoutes);
  return app;
}

module.exports = { createApp };
