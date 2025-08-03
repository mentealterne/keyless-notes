
FROM node:22-alpine AS base
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG DATABASE_URL
RUN corepack enable pnpm


FROM base AS builder
WORKDIR /app



RUN pnpm install --global turbo@^2.5.5

COPY . .
RUN turbo prune notes --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ ./


RUN pnpm install --frozen-lockfile


COPY --from=builder /app/out/full/ ./
RUN echo "DATABASE_URL=${DATABASE_URL}" > ./apps/notes/.env

RUN pnpm build --filter=notes
RUN pnpm migrate:production --filter=notes

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/notes/.next/standalone ./

COPY --from=installer --chown=nextjs:nodejs /app/apps/notes/.next/static ./apps/notes/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/notes/public ./apps/notes/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/notes/prisma/dev.db ./apps/notes/prisma/dev.db



CMD ["node", "apps/notes/server.js"]
