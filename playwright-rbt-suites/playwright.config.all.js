// @ts-check
const { defineConfig } = require('@playwright/test');
const { shared } = require('./playwright.shared');

module.exports = defineConfig({
  ...shared,
  testDir: './tests',
  // Default testMatch of Playwright picks up *.test.js files
});
