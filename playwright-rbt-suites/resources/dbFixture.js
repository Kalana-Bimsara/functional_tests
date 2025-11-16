// resources/dbFixture.js
const path = require('path');

require('dotenv').config({
  // this points one level up from /resources to the project folder
  path: path.resolve(__dirname, '../.env'),
});

const { test: base } = require('@playwright/test');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME || 'test';

const test = base.extend({
  db: [async ({}, use) => {
    if (!uri) {
      throw new Error('MONGODB_URI is not set – configure it in .env or CI env vars');
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
