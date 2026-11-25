class HttpError extends Error {
  // headers are sent with the error response, such as Retry-After.
  constructor(status, message, headers = {}) {
    super(message);
    this.status = status;
    this.headers = headers;
  }
}

// Express 4 does not catch rejected async handlers on its own.
const wrap = (handler) => (req, res, next) => handler(req, res, next).catch(next);

module.exports = { HttpError, wrap };
