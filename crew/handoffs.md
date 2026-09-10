# Handoffs on Kiro

Each hop is a persisted envelope, not a chat line. The checked shape is [`examples/handoff.fixed.json`](../examples/handoff.fixed.json). Generic envelope theory lives in jarvis ADR 0004.

## Persist where

| Hop | Persist on |
|---|---|
| Planner → Implementer | Spec `tasks.md` row and/or [`board.md`](board.md) |
| Implementer → Reviewer | PR description or board note (diff + what / why / risk) |
| Reviewer → Implementer | Review comment with `path:line` |
| Reviewer → Ops | Board / PR: LGTM + residual risks |
| Ops → Human | Handoff JSON (`hitl: true`) |
| Human → Ops | Same JSON: `decision` + `decided_by` |

If the host cannot keep a spec, write the card on `crew/board.md` or the PR. Tomorrow's human must still see `next_owner` and the payload.

## Required fields

Enforced by [`scripts/validate-handoff.js`](../scripts/validate-handoff.js):

| Field | Rule |
|---|---|
| `task_id` | Non-empty string |
| `next_owner` | Non-empty string |
| `action` | Non-empty string |
| `target` | Non-empty string |
| `hitl` | Boolean |
| Privileged `action` | `merge` / `deploy` / `secret_use` / `delete` → `hitl: true` plus `blast_radius` and `rollback` |
| `decided_by` | Must not be `auto` |

Broken (must fail CI): [`examples/handoff.broken.json`](../examples/handoff.broken.json).

## Kiro-specific skips

| Skip | Fix |
|---|---|
| Task lives only in chat | Write the spec task or board row |
| Custom agent ignores steering | Add `resources` glob (see [`docs/paste-into-kiro.md`](../docs/paste-into-kiro.md)) |
| Hook prompt treated as approval | Hooks cannot fill `decision` |
