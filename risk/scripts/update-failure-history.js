// risk/scripts/update-failure-history.js
const fs = require('fs');
const path = require('path');

const riskDataPath = path.join(__dirname, '..', 'risk-data.json');
const riskData = JSON.parse(fs.readFileSync(riskDataPath, 'utf8'));

// Always update from FULL report (not rbt)
const fullReportPath =
  process.env.FULL_REPORT_FILE || path.join(process.cwd(), 'test-results', 'full', 'playwright-report.json');

const report = JSON.parse(fs.readFileSync(fullReportPath, 'utf8'));

function clamp(v) {
  return Math.max(1, Math.min(5, v));
}

// Collect failed spec files (normalized to keys like "tests/SD-01.test.js")
const failed = new Set();

function toKey(specFile) {
  const rel = path.relative(process.cwd(), specFile);
  return rel.replace(/\\/g, '/');
}

// Traverse Playwright JSON
for (const suite of report.suites || []) {
  for (const spec of suite.specs || []) {
    const key = spec.file ? toKey(spec.file) : null;
    if (!key) continue;

    const hasFailure = (spec.tests || []).some(test =>
      (test.results || []).some(r => r.status === 'failed')
    );

    if (hasFailure) failed.add(key);
  }
}

// Update failureHistory
for (const key of Object.keys(riskData)) {
  const current = riskData[key].failureHistory ?? 1;

  if (failed.has(key)) {
    riskData[key].failureHistory = clamp(current + 1);
  } else {
    // slow recovery
    riskData[key].failureHistory = clamp(current - 1);
  }
}

fs.writeFileSync(riskDataPath, JSON.stringify(riskData, null, 2));
console.log('✅ failureHistory updated (from full suite report)');
