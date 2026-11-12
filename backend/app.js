const express = require('express');
const helmet = require('helmet');
const { loadUser } = require('./auth/session');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

// Every API route lives under one versioned prefix, so a later version can
// run beside this one and the storefront's own page paths never collide.
const API_PREFIX = '/api/v1';

function createApi() {
  const api = express.Router();
  api.use(loadUser);
  api.use('/users', userRoutes);
  api.use('/cart', cartRoutes);
  api.use('/products', productRoutes);
  api.use((req, res) => res.status(404).json({ error: 'Not found' }));
  return api;
}

function createApp() {
  const app = express();
  // Security headers on every response: no MIME sniffing, no framing, no
  // referrer leaks and no X-Powered-By. The API only returns JSON, so the
  // default content security policy can stay strict.
  app.use(helmet());
  app.use(express.json());

  // Liveness for the host, outside the versioned API.
  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  app.use(API_PREFIX, createApi());
  // Unexpected errors stay out of responses and logs: they can hold SQL or credentials.
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    if (status >= 500) console.error(`${req.method} ${req.path} failed`);
    res.status(status).json({ error: status >= 500 ? 'Something went wrong' : error.message });
  });
  return app;
}

module.exports = { API_PREFIX, createApp };
