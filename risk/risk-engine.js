// risk/risk-engine.js
const path = require('path');
const riskData = require('./risk-data.json');

function calculateRisk(d) {
  return (d.failureHistory ?? 1) * (d.businessCriticality ?? 1);
}

const ranked = Object.entries(riskData).map(([testPath, d]) => ({
  testPath: testPath.replace(/\\/g, '/'), // normalize
  id: d.id ?? Number.MAX_SAFE_INTEGER,
  risk: calculateRisk(d),
  duration: d.avgDuration ?? Number.MAX_SAFE_INTEGER,
}));

ranked.sort((a, b) => {
  // 1) higher risk first
  if (b.risk !== a.risk) return b.risk - a.risk;
  // 2) shorter duration first
  if (a.duration !== b.duration) return a.duration - b.duration;
  // 3) stable deterministic id
  return a.id - b.id;
});

// pick top N
const N = Number(process.env.RBT_N ?? 5);

// print one test file per line for xargs
ranked.slice(0, N).forEach(t => console.log(t.testPath));
