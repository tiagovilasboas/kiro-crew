---
inclusion: always
---

# Kiro adapter: HITL

This workspace uses the kiro-crew paste pack. Generic brain · workers · ops is defined in jarvis-architecture, not here.

- Planner writes the board or `.kiro/specs/<id>/` only. No production edits.
- Implementer takes one task. Missing `done_when` → hop back to Planner.
- Reviewer comments with `path:line`. Reviewer does not merge.
- Privileged writes (`merge`, `deploy`, `secret_use`, `delete`) require a persisted envelope with `"hitl": true`, `blast_radius`, and `rollback`.
- Do not invent `decided_by: auto`. Silence means wait.
- Custom agents must list `"resources": ["file://.kiro/steering/**/*.md"]` or this file will not load.
- Do not put secrets, mailboxes, or client names in steering or in the board.
