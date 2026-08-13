# Code review rules

Applied automatically by `om-code-review` (and therefore `om-auto-review-pr`) in addition to its built-in checklist.
This is a sandbox: reviews here exist to prove the pipeline works, so keep findings about *this* repository's real
surface and never invent rules borrowed from a larger codebase.

## Review priorities

1. **Correctness** — does the change do what the ticket asked, and does `pnpm typecheck` + `pnpm test` still pass?
2. **Contracts** — see `BACKWARD_COMPATIBILITY.md`. The CI job name, the dev-server port, and the exported
   symbols of `src/greeting.ts` are the only contract surfaces this repo has; touching one is never routine.
3. **Quality** — is the diff the smallest change that solves the problem, and does it read like the code around it?

## Repo-specific checks

- On-screen text comes from the `HEADLINE` constant in `src/greeting.ts`. A diff that hardcodes a string in
  `src/App.tsx` is a finding, not a style preference — it splits the source of truth the tests assert on.
- Every change to `src/greeting.ts` keeps `src/greeting.test.ts` meaningful: a behavior change without a test
  change means either the test was vacuous or the change is untested.
- New tests are Vitest, colocated as `<unit>.test.ts`, and importing from the module under test by relative path.
  `environment: "node"` — a test that touches `document` needs the environment changed explicitly in
  `vite.config.ts` and that change called out in the PR body.
- TypeScript is `strict` with `noUnusedLocals`. No `any`, no `@ts-expect-error` without a comment naming the
  upstream reason. `tsconfig.json` is `noEmit`: a change that makes `tsc` emit output is wrong.
- `package.json` scripts are the pipeline's interface. Renaming or removing `dev`, `typecheck`, `test`, `build`,
  or `preview` breaks `.ai/agentic.config.json` and `.github/workflows/check.yml` — both must change in the same PR.
- The runner is pnpm. A PR that adds `package-lock.json` or `yarn.lock` is a blocker: the skills pick the runner
  from the lockfile, so a second lockfile makes the pipeline's behavior ambiguous.
- Dependency additions need a reason in the PR body. This repo is a stub on purpose; new runtime dependencies are
  almost always the wrong answer.
- `.github/workflows/check.yml`: the job must remain named `check` and must run the same commands as
  `validation.commands`. A drift between the two means the local gate stops predicting the merge gate.

## Severity guidance

- **Blocker** — a red required check, a broken contract surface from `BACKWARD_COMPATIBILITY.md`, a second
  lockfile, or a validation-gate failure.
- **Major** — untested behavior change, duplicated source of truth for the headline, a `tsconfig` or CI change
  that weakens a gate.
- **Minor** — naming, comments, formatting, test wording. Minors never block a merge; file them as follow-ups
  when the PR is otherwise ready.
