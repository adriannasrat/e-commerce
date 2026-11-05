const express = require('express');
const path = require('node:path');
const { loadUser } = require('./auth/session');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

function createApp() {
  const app = express();
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  app.use(loadUser);
  app.use('/users', userRoutes);
  app.use('/cart', cartRoutes);
  app.use('/products', productRoutes);
  // Unexpected errors stay out of responses and logs: they can hold SQL or credentials.
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    if (status >= 500) console.error(`${req.method} ${req.path} failed`);
    res.status(status).json({ error: status >= 500 ? 'Something went wrong' : error.message });
  });
  return app;
}

module.exports = { createApp };
