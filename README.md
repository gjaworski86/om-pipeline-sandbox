# om-pipeline-sandbox

Throwaway sandbox for exercising the `om-*` agent pipeline end to end (idea → commit → PR → review → QA → merge).
Not a product. The app is a stub: one screen, one visible headline (`src/greeting.ts`) to change.

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm typecheck
pnpm test
pnpm build
```

## CI

`.github/workflows/check.yml` runs a job named exactly `check` — the required status check named in the
repository ruleset `require-check-on-main`. Break `pnpm typecheck` or `pnpm test` and merge to `main` is blocked.
