// Vercel's build step. A production deploy migrates the database first, so
// the new code never goes live against an older schema, and a failed
// migration stops the deploy while the previous version keeps serving.
// Preview deploys never touch the production database.
const { execSync } = require('node:child_process');

const run = (command) => execSync(command, { stdio: 'inherit' });

if (process.env.VERCEL_ENV === 'production') run('node backend/migrate.js');
run('npm run build');
