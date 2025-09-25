// db.js
require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing DATABASE_URL in env');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  // Supabase requires SSL; rejectUnauthorized: false is commonly used for managed DBs
  // (only for Node apps — do NOT set this in browser)
  ssl: { rejectUnauthorized: false },

  // Pool sizing for session/transaction pooler (keep it small)
  // If you run many instances (or serverless), keep this low (2-6)
  max: 5,

  // Milliseconds a client must sit idle in the pool before being closed
  idleTimeoutMillis: 30000,

  // Milliseconds to wait when connecting a new client before timing out
  connectionTimeoutMillis: 2000,

  // allow process to exit while clients are idle (useful for scripts / some dev setups)
  allowExitOnIdle: true,
});

// Prevent unhandled 'error' from crashing the process
pool.on('error', (err, client) => {
  // This is emitted for errors on idle clients (or connection-level errors)
  console.error('Unexpected idle client error', err);
  // Optionally: send alert, metrics, or exit process for restart depending on your strategy
  // process.exit(1);
});

// Helper query function
async function query(text, params) {
  return pool.query(text, params);
}

// Helper to get a client and ensure release is called exactly once
// Useful when you need transactions or multiple queries in a single client
async function getClient() {
  const client = await pool.connect();
  let released = false;
  const releaseOnce = () => {
    if (!released) {
      released = true;
      client.release();
    }
  };
  // Wrap client.release so callers can safely call release multiple times
  client.safeRelease = releaseOnce;
  return client;
}

module.exports = {
  query,
  getClient,
  pool,
};

// optional: process-level handlers to capture unexpected exceptions/rejections
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // Optional: graceful shutdown or notify monitoring here
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  // Optional: graceful shutdown or restart
  // process.exit(1);
});
