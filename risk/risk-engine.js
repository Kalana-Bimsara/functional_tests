// risk/risk-engine.js
require('dotenv').config();
const { execSync } = require('child_process');
const riskData = require('./risk-data.json');

function calculateRisk(d) {
  return (d.failureHistory ?? 1) * (d.businessCriticality ?? 1);
}

// rank tests
const ranked = Object.entries(riskData).map(([testPath, d]) => ({
  testPath: testPath.replace(/\\/g, '/'), // normalize for CLI
  id: d.id ?? Number.MAX_SAFE_INTEGER,
  risk: calculateRisk(d),
  duration: d.avgDuration ?? Number.MAX_SAFE_INTEGER,
}));

ranked.sort((a, b) => {
  if (b.risk !== a.risk) return b.risk - a.risk;      // higher risk first
  if (a.duration !== b.duration) return a.duration - b.duration; // faster first
  return a.id - b.id;                                 // deterministic
});

// pick top N
const N = Number(process.env.RBT_N ?? 5);
const selectedTests = ranked.slice(0, N).map(t => t.testPath);

/**
 * =====================================================
 * MODE 1 (DEFAULT): print test list only
 *  - preserves your original behavior
 *  - useful for logging, debugging, research transparency
 * =====================================================
 */
if (process.env.RUN_PLAYWRIGHT !== '1') {
  selectedTests.forEach(t => console.log(t));
  process.exit(0);
}

/**
 * =====================================================
 * MODE 2: execute Playwright safely (NO xargs)
 *  - preserves TEST_MODE=rbt
 *  - prevents FULL overwrite
 * =====================================================
 */
const cmd = [
  'cross-env',
  'TEST_MODE=rbt',
  'npx',
  'playwright',
  'test',
  ...selectedTests,
  '-c',
  'playwright.config.js',
].join(' ');

console.log('\n[RBT] Executing Playwright with command:\n', cmd, '\n');
execSync(cmd, { stdio: 'inherit' });
