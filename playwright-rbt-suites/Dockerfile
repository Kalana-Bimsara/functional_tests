FROM mcr.microsoft.com/playwright:v1.47.2-jammy
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npx playwright install --with-deps
CMD ["npm","run","test:all"]
