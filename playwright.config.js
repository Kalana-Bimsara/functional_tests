require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

/**
 * =====================================================
 * EXECUTION MODE (single source of truth)
 * =====================================================
 * full → Full Test Suite (research baseline)
 * rbt  → Risk-Based Testing suite
 * dev  → Individual / local test execution
 */
const mode = process.env.TEST_MODE || 'dev';

/**
 * =====================================================
 * PER-MODE OUTPUT ISOLATION
 * =====================================================
 */
const reportFileMap = {
  full: 'test-results/full/playwright-report.json',
  rbt:  'test-results/rbt/rbt-report.json',
  dev:  'test-results/dev/playwright-report.json',
};

const outputDirMap = {
  full: 'test-results/full/artifacts',
  rbt:  'test-results/rbt/artifacts',
  dev:  'test-results/dev/artifacts',
};

const htmlDirMap = {
  full: 'test-results/full/html-report',
  rbt:  'test-results/rbt/html-report',
  dev:  'test-results/dev/html-report',
};

const reportFile = reportFileMap[mode];
const outputDir  = outputDirMap[mode];
const htmlDir    = htmlDirMap[mode];

if (!reportFile || !outputDir || !htmlDir) {
  throw new Error(`Invalid TEST_MODE: ${mode}`);
}

/**
 * =====================================================
 * PLAYWRIGHT CONFIG
 * =====================================================
 */
module.exports = defineConfig({
  testDir: './tests',

  // 🔒 FAIR & FIXED for research comparison
  workers: 2,
  fullyParallel: false,

  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 1,

  // 📦 Artifacts (screenshots, videos, traces)
  outputDir,
  preserveOutput: 'failures-only',

  // 📊 REPORTERS (CI + Research safe)
  reporter: [
    ['list'],                                  // console (CI logs)
    ['json', { outputFile: process.env.PW_JSON_OUTPUT_FILE || reportFile }],
     // metrics / APFD
    ['html', { outputFolder: htmlDir, open: 'never' }], // human-readable
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',

    // CI safe
    headless: !!process.env.CI,

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
