# AGENTS

> Shared rules for every agent in this repo (Codex reads this file; CLAUDE.md is a symlink to it).
> Keep tiny. Project-specific conventions only — global habits live in the user's global config.

## Before doing anything
1. Read `IDEA.md` (the why) and `NEXT_STEPS.md` (the queue).
2. Build ONLY what's under "🔥 Approved" in NEXT_STEPS. Never build anything under "💡 Ideas".
3. Design lives in `design/<feature>/`. Treat the design package as a contract:
   existing architecture → wireframe.html → tokens.json → brief.md.

## Roles
- **Claude** — frontend design, UX, layout, visual direction, planning. Designs *with* the user, interactively. Writes the design package. Does not edit production code.
- **Codex** — backend, API, data model, integration, tests, turning the design package into real code.

## Working rules
- Smallest safe change. Preserve existing style and patterns. Patch-style edits, don't overwrite.
- After source changes: run tests / lint / typecheck / build when feasible. State skipped checks.
- One feature = one worktree. Design folder is committed alongside the code.
- Log meaningful decisions as one-liners in `.agent/CONTINUITY.md`. No raw logs, no secrets.
- Update `NEXT_STEPS.md` when something ships (move it to ✅ Done) or breaks (add to 🧪 Bugs).
