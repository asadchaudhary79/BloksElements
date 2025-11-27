############################
# Stage 1 – base Bun image #
############################
FROM oven/bun:1.1 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

############################
# Stage 2 – install deps   #
############################
FROM base AS deps
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

############################
# Stage 3 – build the app  #
############################
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/bun.lock ./bun.lock
COPY . .
RUN bun run build

#################################
# Stage 4 – minimal Node runner #
#################################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

# Install a non-root user
RUN addgroup -g 1001 -S nextjs && \
    adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]

