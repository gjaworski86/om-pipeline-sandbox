# om-pipeline-sandbox — agent instructions

## Project overview

A throwaway sandbox whose only purpose is to exercise the `om-*` agent pipeline end to end (idea → commit → PR → review → QA → merge) on a repository where we hold `ADMIN`. The application is deliberately a stub: a Vite + React + TypeScript single screen rendering one headline string, so that UI-facing gates (`om-auto-qa-pr`, `om-prepare-test-env`) have something real to open in a browser. Nothing here is a product; treat every file as disposable scaffolding for pipeline observation.

## Task-routing table

| When the task involves… | Read first | Key rules |
|---|---|---|
| The visible UI / the string a pipeline run changes | `src/greeting.ts`, `src/App.tsx` | `HEADLINE` in `src/greeting.ts` is the single source of the on-screen text; `App.tsx` renders it under `data-testid="headline"`. Change the constant, not the JSX literal. |
| App bootstrap | `src/main.tsx`, `index.html` | `#root` must exist in `index.html`; `main.tsx` throws when it is missing rather than failing silently. |
| Tests | `src/greeting.test.ts` | Vitest, `globals: true`, `environment: "node"`. Tests sit next to the unit as `<name>.test.ts`. Pure functions only — there is no DOM-testing setup, so add one explicitly if a component test is needed. |
| Build / dev server config | `vite.config.ts`, `package.json` | Dev and preview both pin port 5173 with `--strictPort`; QA tooling relies on that URL. Vitest config lives inside `vite.config.ts`, not a separate file. |
| TypeScript | `tsconfig.json` | `strict` plus `noUnusedLocals`; `noEmit` — `tsc` is a checker here, never a build step. Bundling is Vite's job. |
| CI | `.github/workflows/check.yml` | The job name must stay exactly `check`: it is the required status check in the repository ruleset `require-check-on-main`. Renaming it silently removes the merge gate. |
| Pipeline process, labels, QA gate | `SDLC.md`, `.ai/agentic.config.json` | Change config and `SDLC.md` together. `main` accepts changes only through a PR (zero required approvals, but the `check` run must be green). |
| Review rules | `CODE_REVIEW.md` | Applied automatically by `om-code-review`. |
| Contract surfaces | `BACKWARD_COMPATIBILITY.md` | Read before renaming exports, ports, or the CI job. |

## Validation commands

```bash
pnpm typecheck
pnpm test
```

Both must exit zero before a PR is considered gate-green. The runner is **pnpm** (`pnpm-lock.yaml`, `packageManager: pnpm@8.6.7`) — never `npm` or `yarn`.

## Pointers

- Process: `SDLC.md`
- Review rules: `CODE_REVIEW.md`
- Protected surfaces: `BACKWARD_COMPATIBILITY.md`
- Pipeline configuration: `.ai/agentic.config.json`, tracker descriptor `.ai/trackers/github.md`, browser descriptor `.ai/browsers/agent-browser.md`

## Agent skills

### Issue tracker

Issues live as GitHub issues in `gjaworski86/om-pipeline-sandbox`, driven by the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its role name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.
