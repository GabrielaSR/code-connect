# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pnpm monorepo with two applications:
- **apps/web** — React 19 + TypeScript + Vite (SPA frontend, port 5173)
- **apps/api** — NestJS 11 + TypeScript (REST API, port 3000)

## Commands

All commands run from the repo root unless noted.

### Development
```bash
pnpm dev:web      # Start web dev server
pnpm dev:api      # Start API in watch mode
```

### Build
```bash
pnpm build:web    # Type-check + Vite build
pnpm build:api    # NestJS build to dist/
pnpm start:api    # Run production API (node dist/main)
```

### Testing
```bash
pnpm test:api           # Jest unit tests (API)
# From apps/api:
pnpm test:watch         # Jest watch mode
pnpm test:cov           # Coverage report
pnpm test:e2e           # E2E tests (supertest)
```

### Lint & Format
```bash
# From apps/web:
pnpm lint               # ESLint (flat config)

# From apps/api:
pnpm lint               # ESLint --fix
pnpm format             # Prettier write
```

## Architecture

### Web (apps/web)
Plain Vite SPA — no router or state library yet. Entry point is [apps/web/src/main.tsx](apps/web/src/main.tsx) which mounts `<App />` into `#root`.

#### Atomic Design
Components live in `apps/web/src/components/` organized by level:

```
components/
  atoms/        # Indivisible UI primitives (Button, Input, Badge, Icon…)
  molecules/    # Compositions of atoms (SearchField, Card, FormField…)
  organisms/    # Complex sections composed of molecules (Header, PostList…)
  templates/    # Page layouts with slots, no real data
  pages/        # Templates wired to real data; used as route targets
```

Rules:
- A component may only import from levels **below** its own (organisms can use molecules and atoms, never the reverse).
- Atoms must be fully controlled (no internal state beyond UI toggles like focus/hover).
- Templates receive all data via props — no fetching inside them.

#### Tailwind CSS
Styling is done exclusively with Tailwind utility classes — no custom CSS files per component. Avoid `@apply` except for unavoidable base-layer resets.

#### Component Tests
Every component must have a co-located test file (`ComponentName.test.tsx`) covering its essential use case. Use the testing library already configured in the project (Vitest + React Testing Library is the expected setup for Vite projects). A "essential use case" test must:
- Render the component with realistic props
- Assert the key output is visible/accessible to the user

### API (apps/api)
Standard NestJS layered architecture: `Module → Controller → Service`. Entry point is [apps/api/src/main.ts](apps/api/src/main.ts). Each feature gets its own module following NestJS conventions (decorators require `experimentalDecorators: true` in tsconfig).

#### REST Principles
All endpoints must follow these rules:

- **Resources, not actions** — URLs identify nouns (`/posts`, `/users/:id`), never verbs (`/getPost`, `/createUser`).
- **Correct HTTP verbs** — `GET` (read, idempotent), `POST` (create), `PUT` (full replace), `PATCH` (partial update), `DELETE` (remove). Never use `GET` or `POST` for operations another verb covers.
- **Standard status codes** — `200 OK`, `201 Created` (POST that creates), `204 No Content` (DELETE / PATCH with no body), `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `500 Internal Server Error`.
- **Consistent response shape** — resource endpoints return the resource object directly; collection endpoints return an array (or a paginated envelope `{ data, meta }` when pagination is needed).
- **Statelessness** — no session state on the server; every request carries all context it needs (JWT in header, query params, etc.).
- **Plural nouns** — collection routes are always plural (`/posts`, not `/post`).
- **Nested routes for ownership** — express ownership with nesting up to one level deep (`/users/:userId/posts`); avoid deeper nesting.

### Code Style
- **API**: Prettier enforced via ESLint (`singleQuote: true`, `trailingComma: all`). Always run `pnpm format` before committing API changes.
- **Web**: ESLint only (no Prettier).
- Both apps use TypeScript strict settings with `ES2023` target.

## Git

### Conventional Commits
All commits in both `apps/web` and `apps/api` must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation changes only
- `style` — formatting, missing semicolons, etc. (no logic change)
- `refactor` — code change that is neither a fix nor a feature
- `test` — adding or updating tests
- `chore` — build process, tooling, dependency updates

**Scope** (optional): the affected area, e.g. `feat(posts):`, `fix(auth):`, `chore(deps):`.

**Rules:**
- Description is lowercase, imperative mood, no trailing period — `add post endpoint`, not `Added post endpoint.`
- Keep the subject line under 72 characters.
- Use the body to explain *why*, not *what*, when the change needs context.
- Breaking changes must include `BREAKING CHANGE:` in the footer or a `!` after the type/scope — `feat(auth)!: require JWT on all routes`.
