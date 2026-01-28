require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

// 🔒 Determine execution mode
const mode = process.env.TEST_MODE || 'dev';

// 📁 Decide output locations per mode
const reportFileMap = {
  full: 'test-results/full/playwright-report.json',
  rbt: 'test-results/rbt/rbt-report.json',
  dev: 'test-results/dev/playwright-report.json',
};

const outputDirMap = {
  full: 'test-results/full/artifacts',
  rbt: 'test-results/rbt/artifacts',
  dev: 'test-results/dev/artifacts',
};

const reportFile = reportFileMap[mode];
const outputDir = outputDirMap[mode];

if (!reportFile || !outputDir) {
  throw new Error(`Invalid TEST_MODE: ${mode}`);
}

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
// ✅ CI/CD + Research-safe reporters
  reporter: [
    ['list'], // console output (CI logs)
    ['json', { outputFile: reportFile }], // machine-readable (metrics, APFD)
    [
      'html',
      {
        outputFolder: process.env.TEST_MODE === 'rbt'
          ? 'test-results/rbt/html-report'
          : 'test-results/full/html-report',
        open: 'never', // 🚫 never open browser in CI
      },
    ],
  ],
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
