<div align="center">

# Packages

<img src="docs/banner.svg" alt="arb-dev packages" width="600" />

**Shared `@arb-dev/*` libraries for the ARB Platform**

<p>
  Express middleware &nbsp;·&nbsp; pg pool &nbsp;·&nbsp; React components &nbsp;·&nbsp; GitHub Packages
</p>

<br/>

[![Publish](https://github.com/Arb-Dev/Packages/actions/workflows/publish.yml/badge.svg)](https://github.com/Arb-Dev/Packages/actions/workflows/publish.yml)
[![Release](https://img.shields.io/github/v/release/Arb-Dev/Packages?label=version&color=blue)](https://github.com/Arb-Dev/Packages/releases)
![Node](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)

</div>

---

Three packages in a single npm workspace: `core` (Express middleware + types),
`db` (pg pool factory), and `ui` (React component library). Published to
GitHub Packages under the `@arb-dev` scope and consumed by apps in the
[`Arb-Dev`](https://github.com/Arb-Dev) org.

**Status:** Live. All three packages are at `1.0.0` and consumed by
[`database`](https://github.com/Arb-Dev/database). Published automatically on
merge to `main` via the `publish` workflow.

## Contents

- [Platform repos](#platform-repos)
- [Packages](#packages-1)
  - [@arb-dev/core](#arb-devcore)
  - [@arb-dev/db](#arb-devdb)
  - [@arb-dev/ui](#arb-devui)
- [Installing](#installing)
- [Development](#development)
- [Publishing](#publishing)
- [Repo layout](#repo-layout)

## Platform repos

This is one of 5 repos under [`Arb-Dev`](https://github.com/Arb-Dev) that
together make up the platform:

- **[`platform`](https://github.com/Arb-Dev/platform)** — the gateway:
  Traefik, verify-service, registry-service, k8s manifests, and
  app-registration. **Live and deployed**.
- **[`database`](https://github.com/Arb-Dev/database)** — employee database.
  System of record for who's an employee and their role/department/status.
  **Live and deployed**.
- **[`landing`](https://github.com/Arb-Dev/landing)** — the portal landing
  page, listing the apps a logged-in user can access. **Live and deployed**.
- **[`tasks`](https://github.com/Arb-Dev/tasks)** — task assignment app
  (onboarding, offboarding, IT provisioning, performance reviews, etc.). Not
  yet implemented.
- **[`packages`](https://github.com/Arb-Dev/packages)** (this repo) — shared
  `@arb-dev/*` libraries consumed by the app repos above.

## Packages

### `@arb-dev/core`

Express middleware and types shared across all platform apps. Key exports:

| Export | What it does |
|---|---|
| `platformAuth` | Middleware that reads `X-User-*` / `X-Client-*` headers injected by Traefik ForwardAuth and attaches a `PlatformUser` to `req.user`. Bypassed automatically when `NODE_ENV=test` or `SKIP_PLATFORM_AUTH=true`. |
| `requireRole(...roles)` | Middleware factory that rejects requests where `req.user` doesn't hold at least one of the specified roles. |
| `PlatformUser` | Interface: `{ userId, email, roles[] }`. Augments `Express.Request` globally. |
| `errorHandler` | Express error-handling middleware. |
| `cors` | CORS middleware pre-configured for platform origins. |

### `@arb-dev/db`

Thin wrapper around `pg` that creates a connection pool from a
`DATABASE_URL` string:

```ts
import { createPool } from '@arb-dev/db';

const pool = createPool(process.env.DATABASE_URL);
```

Automatically enables SSL (with `rejectUnauthorized: false`) when the URL
contains `supabase` or `DB_SSL=true` is set. Re-exports `Pool` and
`QueryResult` from `pg` directly so callers don't need `pg` as a direct
dependency.

### `@arb-dev/ui`

React component library with a matching CSS layer. Components are plain
TypeScript/React (no CSS-in-JS) — styles come from the CSS exports.

**Components:** `PortalLayout`, `Button`, `Badge`, `DataPanel`, `Field`,
`Input`, `Select`, `Spinner`, `EmptyState`.

**CSS exports** (from `package.json` `exports`):

| Import | Contents |
|---|---|
| `@arb-dev/ui/css` | All styles (tokens + layout + components) |
| `@arb-dev/ui/css/tokens` | CSS custom properties only |
| `@arb-dev/ui/css/layout` | Page/grid layout |
| `@arb-dev/ui/css/components` | Component styles |

Peer dependencies: `react >=18`, `lucide-react >=0.400`.

## Installing

Packages are published to GitHub Packages under the `@arb-dev` scope. Add
this to your project's `.npmrc`:

```
@arb-dev:registry=https://npm.pkg.github.com
```

Then install as normal:

```sh
npm install @arb-dev/core @arb-dev/db @arb-dev/ui
```

A `GITHUB_TOKEN` (or personal access token with `read:packages`) must be
available in the environment for `npm install` to resolve the registry.

## Development

```sh
npm install        # install all workspace deps
npm run build      # build core, db, ui in order
npm test           # run tests across all workspaces
```

Each workspace has its own `tsconfig.json` and builds to `dist/`. The root
`tsconfig.base.json` sets shared compiler options.

## Publishing

The `publish` workflow runs on every merge to `main`. It builds all three
packages and publishes each to `https://npm.pkg.github.com` using
`GITHUB_TOKEN`. `release-please` manages version bumps and changelogs — open
a release PR to cut a new version.

## Repo layout

```
packages/
├── core/                    # @arb-dev/core — Express middleware + types
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── types.ts         # PlatformUser, Express.Request augmentation
│       ├── errors.ts
│       └── middleware/
│           ├── platformAuth.ts  # platformAuth, requireRole
│           ├── errorHandler.ts
│           └── cors.ts
├── db/                      # @arb-dev/db — pg pool factory
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts         # createPool, re-exports Pool + QueryResult
└── ui/                      # @arb-dev/ui — React components + CSS
    ├── package.json
    ├── tsconfig.json
    ├── css/
    │   ├── tokens.css
    │   ├── layout.css
    │   ├── components.css
    │   └── index.css        # re-exports all three
    └── src/
        ├── index.ts
        └── components/
            ├── PortalLayout.tsx
            ├── Button.tsx
            ├── Badge.tsx
            ├── DataPanel.tsx
            ├── Input.tsx    # Field, Input, Select
            └── Spinner.tsx  # Spinner, EmptyState
```
