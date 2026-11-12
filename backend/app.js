const express = require('express');
const { randomUUID } = require('node:crypto');
const helmet = require('helmet');
const pinoHttp = require('pino-http');
const { logger: defaultLogger } = require('./logger');
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

// A caller may pass its own request id, such as a host's trace id. Anything
// else gets a fresh one, and the id is echoed so a reported error can be
// found in the log.
const requestId = (req, res) => {
  const supplied = req.headers['x-request-id'];
  const id = typeof supplied === 'string' && /^[\w-]{1,64}$/.test(supplied) ? supplied : randomUUID();
  res.setHeader('X-Request-Id', id);
  return id;
};

// One line per request: id, method, path, status and duration. Headers,
// cookies and bodies are never logged.
const requestLogging = (logger) => pinoHttp({
  logger,
  genReqId: requestId,
  customLogLevel: (req, res, error) => (error || res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info'),
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
    // Error messages and stacks can hold SQL or credentials: log the type only.
    err: (error) => ({ type: error.name }),
  },
});

function createApp({ logger = defaultLogger } = {}) {
  const app = express();
  app.use(requestLogging(logger));
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
    if (status >= 500) req.log.error({ error: error.name }, 'Request failed');
    res.status(status).json({ error: status >= 500 ? 'Something went wrong' : error.message });
  });
  return app;
}

module.exports = { API_PREFIX, createApp };
