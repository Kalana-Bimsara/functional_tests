require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

const reportFile = process.env.PW_REPORT_FILE || 'test-results/playwright-report.json';
const outputDir = process.env.PW_OUTPUT_DIR || 'test-results/artifacts';

module.exports = defineConfig({
  testDir: './tests',
  workers: 2,          // 🔒 FIXED for BOTH suites
  fullyParallel: false, // allowed but controlled
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: 1,

  // ✅ artifacts folder (screenshots, traces, videos...)
  outputDir,

  // ✅ do NOT use invalid values here. Only: "always" | "never" | "failures-only"
  preserveOutput: 'failures-only',

  // ✅ JSON report saved to a file (no stdout redirect = no JSON corruption)
  reporter: [['json', { outputFile: reportFile }], ['list']],

  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
