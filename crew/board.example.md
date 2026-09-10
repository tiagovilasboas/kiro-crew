# Board example

Copyable Kiro-shaped card. Blank: [`board.md`](board.md). This is a replayable example, not live work on `kiro-crew`.

## Goal

Add `GET /status.json` that returns `{"ok": true}` so uptime probes do not scrape HTML, without hostnames, versions, or git SHAs in the body.

## Out of scope

- Auth, rate limits, or a status HTML page
- New crew roles
- Restating jarvis ADRs in always-on steering

## Kiro persist

- Spec path: `.kiro/specs/status-json/` (optional; this card is enough if you skip specs)
- Pack copied: `pack/steering/hitl.md`, `pack/hooks/privileged-writes.json`

## Tasks

| ID | Owner | Scope | Files likely | Done when | Status |
|---|---|---|---|---|---|
| T1 | Implementer | Public JSON status + README one-liner | `src/status/handler.ts`, `src/status/handler.test.ts`, `README.md` | `GET /status.json` → `{"ok": true}` only; README links the path; tests assert body keys | done |
| T2 | Reviewer | Diff vs T1 done-when | (T1 diff) | `path:line` findings or LGTM + residual risks | LGTM |
| T3 | Ops | CI + HITL merge ask | branch `feat/status-json` | Envelope persisted; human `decision` recorded | done (human approve recorded) |

## Handoff notes

1. Planner → Implementer: T1 row. One spec task this turn.
2. Implementer → Reviewer: JSON status + README link. Risk: body might leak diagnostics.
3. Reviewer → Implementer: `src/status/handler.ts:18` hostname; `:19` gitSha. Drop both.
4. Reviewer → Ops: LGTM. Residual: public contract; extra keys later break probes. HITL still required.
5. Ops → Human: same shape as [`examples/handoff.fixed.json`](../examples/handoff.fixed.json).
6. Human → Ops: `decision: approve` / `decided_by: maintainer`. Ops merges.

## HITL envelope (Ops → Human)

See the checked fixture. Privileged merge without `"hitl": true` is [`examples/handoff.broken.json`](../examples/handoff.broken.json) and must fail CI.
