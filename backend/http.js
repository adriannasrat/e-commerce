class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Express 4 does not catch rejected async handlers on its own.
const wrap = (handler) => (req, res, next) => handler(req, res, next).catch(next);

module.exports = { HttpError, wrap };
