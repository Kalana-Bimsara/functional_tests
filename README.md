# Playwright JS — Separate RBT vs Full (uses `*.test.js`)

- **RBT suite**: `tests/rbt/*.test.js` + `playwright.config.rbt.js`
- **Full suite**: `tests/**/*.{test}.js` + `playwright.config.all.js`
- Works on Windows; Docker provided.

## Run
```bash
npm install
npm run install:browsers

# Full
npm run test:all

# RBT
npm run test:rbt
```
