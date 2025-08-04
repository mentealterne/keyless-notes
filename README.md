# Keyless Notes

A simple note-taking application built as a challenge for Keyless.  
This is a Turborepo monorepo (v2) managed with pnpm:

- **apps/notes** — Next.js 15 application
- **packages/web-components** — shared Web Components (e.g. `<note-item>`)

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) installed globally

---

## Installation

From the repository root, run:

```bash
pnpm install
```

This will install dependencies for all workspaces (`apps/notes`, `packages/web-components`, etc.).

---

## Development

You can run both the Next.js app and the Web Components package in parallel using the built-in script:

### Prisma migrations and client
Be sure to run the Prisma migrations and generate the client before starting the development server:
```bash
pnpm --filter=notes prisma:generate
pnpm --filter=notes prisma:migrate
```

Then, start the development tools:
```
```bash
pnpm notes:dev:tools
```

This uses `concurrently` to:

1. Start the Next.js dev server in `apps/notes`
2. Start the Web Components build/watch in `packages/web-components`

Open your browser at [http://localhost:3000](http://localhost:3000) to see Keyless Notes in action.

---

## Docker Compose

A `docker-compose.yml` file is provided in `apps/notes` to spin up the production build (using SQLite):

```bash
# from the monorepo root
docker compose up --build -d
```

- **Builds** the Docker image defined by `apps/notes/Dockerfile`
- **Mounts** `./prisma/dev.db` for persistent storage
- **Exposes** port `3000`

To tear down the container:

```bash
docker compose down
```

---

## Project Structure

```
/
├─ apps/
│  └─ notes/               # Next.js 15 app
│     ├─ pages/
│     ├─ prisma/           # schema & (dev) SQLite DB
│     └─ docker-compose.yml
├─ packages/
│  ├─ web-components/ # shared Lit-based Web Components
   ├─ eslint-config/ # shared ESLint config
   └─ typescript-config/ # shared TypeScript config
   
├─ turbo.json              # Turborepo config
├─ pnpm-workspace.yaml
└─ package.json            # root scripts & workspace config
```

---

## Scripts

| Command                                                    | Description                                    |
| ---------------------------------------------------------- | ---------------------------------------------- |
| `pnpm install`                                             | Install all workspaces                        |
| `pnpm notes:dev:tools`                                     | Run Next.js and Web Components in dev mode    |
| `cd apps/notes && docker compose up --build -d`            | Build & run production container              |

---

Enjoy taking notes with Keyless Notes!
