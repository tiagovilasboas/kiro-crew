# Board example

Filled walkthrough for the blank template in [`board.md`](board.md). Goal is realistic and harness-agnostic: improve this crew’s own docs so a host can paste roles without inventing handoffs.

Use as a **shape reference**. Copy the structure into your host; do not treat the task IDs as live work unless you are maintaining this repo. For the hop-by-hop conversation (Planner → Human) with filled payloads, see [`docs/walkthrough.md`](../docs/walkthrough.md) — that run uses a different example goal.

---

## Goal

Add a paste-into-host starter and a filled board example so a developer can run the four-role crew on any agentic IDE without inventing handoff payloads.

## Out of scope

- Host-specific agent config files or vendor SDKs
- Copying playbook/skill dumps from other repos
- New roles beyond Planner · Implementer · Reviewer · Ops

## Tasks

| ID | Owner | Scope | Files likely | Done when | Status |
|---|---|---|---|---|---|
| T1 | Implementer | Add `docs/paste-into-host.md` short starter (roles + HITL + board pointer) | `docs/paste-into-host.md`, `README.md` | File exists; README links it; wording says Kiro is an example host | done |
| T2 | Implementer | Add `crew/board.example.md` with this filled goal and hops | `crew/board.example.md`, `crew/board.md` | Example validates against template columns; board.md points here | done |
| T3 | Implementer | Densify `roles.md` / `handoffs.md` / `hitl.md` with concrete payloads | `crew/roles.md`, `crew/handoffs.md`, `crew/hitl.md` | Each role has job/objective/write boundary; each hop has owner+payload; HITL interrupt record present | done |
| T4 | Reviewer | Review T1–T3 vs contracts in CONTRIBUTING | (diff of above) | Findings with `path:line` or LGTM + residual risks | LGTM |
| T5 | Ops | CI/docs sanity + HITL merge ask | branch `content/stage1-board-roles` | Human decision recorded before merge to default branch | waiting HITL |

## Handoff log (abridged)

1. **Planner → Implementer:** cards T1–T3 with done-when above.
2. **Implementer → Reviewer:** docs-only diff; risk = accidental Kiro lock-in (mitigated in prose).
3. **Reviewer → Ops:** LGTM; residual risks = none beyond docs drift; still HITL before default-branch merge.
4. **Ops → Human:** merge ask; rollback = revert; `if_no_answer: wait`.

## Notes

- Pattern layer stays in `crew/`. Host paste lives in `docs/paste-into-host.md`.
- Web pattern refs only (Anthropic orchestrator/workers, CrewAI tasks, AutoGen handoff, LangGraph interrupt) — see CONTRIBUTING.
- Next owner after human approve: Ops merges; Planner closes the board goal.
