# Agents

This repository is the **Kiro host adapter** (paste pack). Generic brain · workers · ops lives in [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture). Desktop chief-of-staff lives in [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture). Do not restate those patterns here.

## Layout

```
docs/paste-into-kiro.md     how to drop the pack into a Kiro workspace
docs/why-not-jarvis.md      this repo vs jarvis vs grok-bot
pack/steering/              files to copy into .kiro/steering/
pack/hooks/                 files to copy into .kiro/hooks/
crew/roles.md               Kiro surface map only
crew/handoffs.md            hop persist locations + fixture fields
crew/hitl.md                Kiro hook / interrupt binding
crew/board.md               blank Kiro-shaped board
crew/board.example.md       filled board a peer can copy
examples/handoff.*.json     one broken + one fixed envelope
scripts/validate-handoff.js zero-dep Node checker
scripts/check-fixtures.sh   CI: fixed must pass, broken must fail
```

## Do

- Keep edits Kiro-delta: paste steps, steering/hooks constraints, board shape, fixture fields.
- Point at jarvis for layer theory and ADRs. Point at grok-bot for desktop CoS.
- Privileged writes (`merge`, `deploy`, `secret_use`, `delete`) require `"hitl": true` plus `blast_radius` and `rollback`.
- Run `sh scripts/check-fixtures.sh` before you change the fixture or validator.

## Do not

- Add a Purpose / Propósito block to the README.
- Use an em dash character in docs.
- Re-copy orchestrator/workers, CrewAI, AutoGen, or LangGraph manifesto text.
- Encode Cursor, Goose, or other host APIs in `pack/`.
- Invent `decided_by: auto`. Silence means wait.
- Absorb sibling kits (AppSec skills, evals, desktop CoS) into `crew/`.
