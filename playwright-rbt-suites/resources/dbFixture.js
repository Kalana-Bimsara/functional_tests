// resources/dbFixture.js
const path = require('path');
const fs = require('fs');
const { test: base } = require('@playwright/test');
const { MongoClient } = require('mongodb');

// 1. If CI already provided MONGODB_URI, don't bother with .env
if (process.env.MONGODB_URI) {
  console.log('[DB] Using MONGODB_URI from environment (CI or shell)');
} else {
  // 2. Try to load from ../.env for local runs
  const envPath = path.resolve(__dirname, '../.env');

  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    console.log(`[DB] Loaded env from ${envPath}`);
  } else {
    console.warn('[DB] No MONGODB_URI in env and no .env file found');
  }
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME || 'test';

const test = base.extend({
  db: [async ({}, use) => {
    if (!uri) {
      throw new Error(
        'MONGODB_URI is not set – configure it in .env (local) or CI env vars (GitHub Actions)'
      );
    }

    const client = new MongoClient(uri);

    await client.connect();
    console.log(`[DB] Connected to MongoDB successfully (db: ${dbName})`);

    const db = client.db(dbName);

    await use(db);

    await client.close();
    console.log('[DB] MongoDB connection closed');
  }, { scope: 'test' }],
});

module.exports = { test };
