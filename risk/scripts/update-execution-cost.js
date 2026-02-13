// risk/scripts/update-execution-cost.js
const fs = require('fs');
const path = require('path');

const riskDataPath = path.join(__dirname, '..', 'risk-data.json');
const riskData = JSON.parse(fs.readFileSync(riskDataPath, 'utf8'));

const fullReportPath =
  process.env.FULL_REPORT_FILE || path.join(process.cwd(), 'test-results', 'full', 'playwright-report.json');

const report = JSON.parse(fs.readFileSync(fullReportPath, 'utf8'));

function toKey(specFile) {
  const rel = path.relative(process.cwd(), specFile);
  return rel.replace(/\\/g, '/');
}

// Collect durations per spec file
const durationByFile = new Map();

for (const suite of report.suites || []) {
  for (const spec of suite.specs || []) {
    if (!spec.file) continue;

    const key = toKey(spec.file);

    // Sum all test result durations under this spec
    let total = 0;
    for (const test of spec.tests || []) {
      for (const r of test.results || []) {
        total += (r.duration ?? 0);
      }
    }

    durationByFile.set(key, total);
  }
}

// Update avgDuration only for known keys
for (const key of Object.keys(riskData)) {
  if (durationByFile.has(key)) {
    riskData[key].avgDuration = durationByFile.get(key);
  }
}

fs.writeFileSync(riskDataPath, JSON.stringify(riskData, null, 2));
console.log('✅ Updated avgDuration in risk-data.json (from full suite report)');
