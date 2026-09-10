# Paste into Kiro

Kiro-only. Generic layers stay in [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture). This page is the drop-in.

## Copy

From this repo into the target workspace:

```
pack/steering/hitl.md      →  .kiro/steering/hitl.md
pack/hooks/privileged-writes.json  →  .kiro/hooks/privileged-writes.json
crew/board.md              →  crew/board.md   (or start a Kiro spec)
```

Optional: copy `AGENTS.md` from this repo only if the target workspace has none. Do not overwrite a product `AGENTS.md`.

## Kiro constraints

Steering ([docs](https://kiro.dev/docs/steering/)):

- Workspace files live in `.kiro/steering/`. They travel with the repo.
- Inclusion modes (`always`, `fileMatch`, `manual`, `auto`) need YAML front matter as the first bytes of the file.
- `AGENTS.md` is always included and has no inclusion modes.
- Custom agents do **not** auto-load steering. Add `"resources": ["file://.kiro/steering/**/*.md"]` on the agent.
- Kiro CLI currently loads every file in `.kiro/steering/` (no inclusion filter). Keep always-on files short.
- Never put secrets, mailboxes, or client names in steering.

Hooks ([docs](https://kiro.dev/docs/ide/whats-new-v1/hooks/)):

- v1 schema in `.kiro/hooks/*.json` (`version: "v1"`).
- `command` exit `2` blocks `PreToolUse`, `UserPromptSubmit`, and `PreTaskExec`. Other non-zero exits are errors, not blocks.
- `agent` actions inject a prompt. They cannot block and cannot invent `decision` / `decided_by`.
- Global hooks in `~/.kiro/hooks/` are a personal overlay. Do not treat them as the team contract.

Specs:

- A Kiro spec (`.kiro/specs/<id>/requirements.md`, `design.md`, `tasks.md`) can be the live board.
- If you skip specs, persist the same rows on `crew/board.md`. Chat is not the board.

## Board workflow (Kiro-shaped)

1. Planner writes one-sentence goal + out-of-scope on the board or spec. No production edits.
2. One spec task / board row per Implementer turn. Missing `done_when` → hop back to Planner.
3. Reviewer comments with `path:line` (or host locator). Reviewer does not merge.
4. Ops records CI and copies residual risks onto a handoff JSON (`examples/handoff.fixed.json` shape).
5. Privileged write pauses. Human fills `decision` + `decided_by`. Silence waits.

## Pair, do not absorb

Load sibling kits in Kiro as skills / MCP. Do not copy them into `crew/`.

| Need | Sibling |
|---|---|
| Reviewer AppSec | [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review) |
| Ops evidence | [agent-measurement](https://github.com/tiagovilasboas/agent-measurement) |
| Layers | [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) |
| Desktop CoS | [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture) |

## Do not

- Paste this pack into Cursor or Goose and call it done. Those hosts are not this adapter.
- Put always-on steering that restates jarvis ADRs (token waste; the ADR already exists).
- Merge because a hook ran or CI is green. Green is a status. HITL is a human field.
