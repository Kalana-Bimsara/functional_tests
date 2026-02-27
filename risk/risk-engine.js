// risk/risk-engine.js
require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');     // ✅ ADD THIS
const fs = require('fs');         // ✅ ADD THIS

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
// ---------- STRICT ORDER EXECUTION ----------
console.log('\n[RBT] Running prioritized suite in STRICT order (one file per run):\n');
selectedTests.forEach((t, i) => console.log(`${i + 1}. ${t}`));

const runsDir = path.posix.join('test-results', 'rbt', 'runs');
fs.mkdirSync(runsDir, { recursive: true });

const merged = {
  config: null,
  suites: [],
  errors: [],
  stats: { startTime: new Date().toISOString(), duration: 0, expected: 0, skipped: 0, unexpected: 0, flaky: 0 },
};

const startAll = Date.now();

for (let i = 0; i < selectedTests.length; i++) {
  const testFile = selectedTests[i];
  const runJson = path.posix.join(runsDir, `run-${String(i + 1).padStart(2, '0')}.json`);

  const cmd = [
    'cross-env',
    'TEST_MODE=rbt',
    'PW_JSON_OUTPUT_FILE=' + runJson,
    'npx',
    'playwright',
    'test',
    testFile,
    '-c',
    'playwright.config.js',
    '--workers=1',
  ].join(' ');

  try {
  execSync(cmd, { stdio: 'inherit' });
} catch (err) {
  console.log(`[RBT] ❌ Test failed but continuing: ${testFile}`);
  hasFailure = true;   // ← ADD THIS
}

  if (!fs.existsSync(runJson)) {
    console.log(`[RBT] ⚠ JSON report missing for: ${testFile}`);
    continue;
  }

  const run = JSON.parse(fs.readFileSync(runJson, 'utf8'));

  if (!merged.config) merged.config = run.config;
  merged.suites.push(...(run.suites ?? []));
  merged.errors.push(...(run.errors ?? []));

  const s = run.stats ?? {};
  merged.stats.duration += (s.duration ?? 0);
  merged.stats.expected += (s.expected ?? 0);
  merged.stats.skipped += (s.skipped ?? 0);
  merged.stats.unexpected += (s.unexpected ?? 0);
  merged.stats.flaky += (s.flaky ?? 0);
}

merged.stats.duration = Date.now() - startAll;

const finalReport = path.posix.join('test-results', 'rbt', 'rbt-report.json');

fs.writeFileSync(finalReport, JSON.stringify(merged, null, 2), 'utf8');
if (hasFailure) {
  console.log('\n[RBT] ❌ Failures detected in prioritized suite.');
  console.log('[RBT] ❌ Exiting with code 1 to stop pipeline.');
  process.exit(1);   // ← THIS STOPS PIPELINE
}

console.log('\n[RBT] ✅ Strict-order run complete. Merged report:', finalReport);
