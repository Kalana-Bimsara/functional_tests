# FROM mcr.microsoft.com/playwright:v1.47.2-jammy
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci || npm install
# COPY . .
# RUN npx playwright install --with-deps
# CMD ["npm","run","test:all"]


# Use the official Playwright image (match your @playwright/test ~ 1.57.x)
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Install deps first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy project
COPY . .

# (Optional) Install browsers again only if you want (image already has them)
RUN npx playwright install --with-deps

# Default command (compose will override per-service)
CMD ["npm", "run", "test"]
