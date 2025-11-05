// @ts-check
const { defineConfig } = require('@playwright/test');
const { shared } = require('./playwright.shared');

module.exports = defineConfig({
  ...shared,
  testDir: './tests/rbt',
});
