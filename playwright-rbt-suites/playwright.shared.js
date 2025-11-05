const { defineConfig, devices } = require('@playwright/test');

const shared = {
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: 1,
  reporter: 'list',
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

module.exports = { shared };
