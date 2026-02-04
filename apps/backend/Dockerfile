from oven/bun:1.2.6 AS base

WORKDIR /app

COPY package.json bun.lock turbo.json ./

COPY packages ./packages

COPY apps/backend ./apps/backend

RUN bun install

# WORKDIR /app/apps/backend

EXPOSE 8080

CMD ["bun", "run", "apps/backend/src/index.ts"]
