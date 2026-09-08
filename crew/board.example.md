# Board example

One filled feature a peer can **copy**. Blank template: [`board.md`](board.md). Hop-by-hop movie (different goal, `SECURITY.md`): [`docs/walkthrough.md`](../docs/walkthrough.md).

This card is a **replayable example**, not live work on `kiro-crew`. Copy the structure into your host; do not treat the task IDs as open tickets unless you mean it. Kiro is an example host — the same card pastes into any agentic IDE.

---

## Goal

Add `GET /status.json` that returns `{"ok": true}` so uptime probes do not scrape HTML, without hostnames, versions, or git SHAs in the body.

## Out of scope

- Auth, rate limits, or a status HTML page redesign
- Host-specific agent configs or vendor SDKs
- New crew roles
- Inventing uptime percentages or probe SLAs

## Tasks

| ID | Owner | Scope | Files likely | Done when | Status |
|---|---|---|---|---|---|
| T1 | Implementer | Public JSON status body + README one-liner | `src/status/handler.ts`, `src/status/handler.test.ts`, `README.md` | `GET /status.json` → `{"ok": true}` only; README links the path; tests assert body keys | done |
| T2 | Reviewer | Diff vs T1 done-when | (T1 diff) | Findings with `path:line` or LGTM + residual risks | LGTM |
| T3 | Ops | CI + ship checklist + HITL merge ask | branch `feat/status-json` | Interrupt record persisted; human decision recorded before default-branch merge | done (human approve recorded) |

If a row is missing owner, files-likely, or done-when, Planner is not done. Implementer refuses the card (hop back), not guess.

## Handoff notes

1. **Planner → Implementer:** T1 card above. Next owner: Implementer. One task this turn.
2. **Implementer → Reviewer:** First diff. What: JSON status + README link. Why: probes were scraping HTML. Risk: body might leak diagnostics. Claim: `rg -n 'status.json' README.md src/status/`.
3. **Reviewer → Implementer:** `changes_requested` (evidence below). Next owner: Implementer. Do not start T3.
4. **Implementer → Reviewer:** Rework addresses `handler.ts:18` and `handler.ts:19`. Claim: test asserts `Object.keys(body).toEqual(['ok'])`.
5. **Reviewer → Ops:** LGTM + residual risks (below). HITL still required. Reviewer does not merge.
6. **Ops → Human:** checklist + interrupt record. `if_no_answer: wait`.
7. **Human → Ops:** `decision: approve` / `decided_by: maintainer`. Ops merges; Planner closes the goal.

---

## Reviewer evidence (both patterns)

### T2 first pass — `path:line` (not LGTM)

```
task_id: T2
verdict: changes_requested
next_owner: Implementer
findings:
  - loc: src/status/handler.ts:18
    problem: Body includes hostname. Card forbids hostnames in the JSON.
    fix: Drop the field. Diagnostics stay in server logs the probe cannot read.
  - loc: src/status/handler.ts:19
    problem: Body includes gitSha (a version). Card forbids versions and SHAs.
    fix: Return only {"ok": true}.
residual_risks: n/a until rework
```

Chat “looks fine” is not this hop. A board row of `done` with no locator is theater — [`docs/anti-patterns.md`](../docs/anti-patterns.md).

### T2 after rework — LGTM

```
task_id: T2
verdict: LGTM
next_owner: Ops
change: feat/status-json (handler + test + README link)
ci: green — paste the host job URL; this example does not invent one
residual_risks:
  - {"ok": true} is a public contract; adding keys later is a breaking change for probes.
  - Still require human merge to the default branch (HITL). Reviewer LGTM is not merge.
scope_check: no hostname, version, or git SHA in the body — held
```

---

## Ops checklist (before the HITL ask)

- [x] T2 is LGTM with residual risks on the board (not chat-only)
- [x] CI status recorded (green / paste URL — no invented latency or uptime %)
- [x] Residual risks copied onto the interrupt
- [x] Rollback one-liner present

Human `decision` + `decided_by` live on the interrupt below — not a fifth checklist row, and not merge-on-silence.

## HITL gate (Ops → Human → Ops)

```
action: merge
target: branch feat/status-json → default branch
blast_radius: new public GET /status.json contract + README link. No secrets, no HTML redesign.
rollback: revert the merge commit
residual_risks:
  - Public contract; extra JSON keys later will break strict probes
  - Usual docs drift on the README one-liner
ci: green / paste the host job URL
decision: approve
decided_by: maintainer
if_no_answer: wait — do not merge
decision_needed: approve | reject | defer
```

Incomplete ask (no rollback) → do not send it. Silence is not this hop.

---

## Notes

- Pattern layer stays in `crew/`. Host skills stay **outside** `crew/`. Wrong turns: [`docs/anti-patterns.md`](../docs/anti-patterns.md). Other IDE: [`docs/paste-into-host.md`](../docs/paste-into-host.md).
- Do not add `src/status/` to *this* repository unless you are actually shipping that endpoint.
- Next owner after human approve: Ops merges; Planner marks T1–T3 done and closes the goal.
