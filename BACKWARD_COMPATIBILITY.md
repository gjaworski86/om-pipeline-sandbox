# Backward compatibility

An inventory of what this repository treats as a **protected contract surface**, and what a change to one requires.
The app is a stub with no consumers, so the surfaces that matter are the ones *tooling* depends on — the pipeline,
CI, and QA automation. Breaking one of those does not break a user; it silently breaks a gate, which is worse
because nothing turns red.

This repo publishes no package, exposes no HTTP API, has no database, no CLI, and no events. Sections for those
surfaces are deliberately absent rather than filled with placeholders.

## Protected surfaces

| Surface | Where | What counts as breaking | Required path |
|---|---|---|---|
| CI job name `check` | `.github/workflows/check.yml` (`jobs.check`, `name: check`) | Renaming the job or its `name`, or moving it to another workflow file | Update the repository ruleset `require-check-on-main` in the same change; otherwise `main` is left with no required check and every red PR becomes mergeable |
| Validation script names | `package.json` scripts `typecheck`, `test` | Renaming or removing either | Update `.ai/agentic.config.json` (`validation.commands`), `SDLC.md`, and the workflow in the same PR |
| Dev-server URL | `package.json` scripts `dev`/`preview` — port 5173, `--strictPort` | Changing the port, dropping `--strictPort`, or making the server bind elsewhere | Update `.ai/qa` tooling expectations and say so in the PR body; QA and integration-test skills open this URL |
| Package manager | `pnpm-lock.yaml` + `packageManager: pnpm@8.6.7` | Adding a second lockfile, or switching runner | One lockfile only; switch in a dedicated PR that also updates the workflow's `pnpm/action-setup` step |
| `src/greeting.ts` exports | `HEADLINE`, `greeting(name: string): string` | Renaming or removing an export, or changing `greeting`'s signature | Update `src/App.tsx` and `src/greeting.test.ts` together; these are the only consumers, so a rename is cheap but must be complete |
| `#root` mount point | `index.html`, `src/main.tsx` | Renaming or removing the element | Change both files together; `main.tsx` throws loudly by design, so never "fix" it by making the failure silent |
| Pipeline configuration | `.ai/agentic.config.json`, `.ai/trackers/github.md`, `.ai/browsers/agent-browser.md` | Changing `baseBranch`, `tracker`, `browser.provider`, or the label taxonomy | Change `SDLC.md` in the same PR; the two documents describe one process. Local edits to the descriptors are intentional and must survive re-running `om-setup-agent-pipeline` |

## Rules

- A change to any row above is at least `risk-medium` and names the surface in its PR body.
- Deprecation windows do not apply here — there are no external consumers. Completeness does: a contract change
  lands with every dependent file updated in the same PR, or it does not land.
- No version bumps: the package is `private` and unversioned in practice.
