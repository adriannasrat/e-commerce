// Vercel runs this file as a serverless function. Requests to /api/... are
// rewritten here by vercel.json and keep their original path, so the same
// Express app that runs locally answers them. The database connects lazily
// on the first query, so there is no startup step.
const { createApp } = require('../backend/app');

module.exports = createApp();
