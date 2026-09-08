# Contributing

This repository documents a **harness-agnostic** multi-agent crew: roles, handoffs, and human-in-the-loop (HITL) gates. Kiro is one example host. The same pattern should map onto any agentic IDE.

Contributing language for this file, issue forms, and pull requests is **English**. Commands and paths stay in English fences.

```
crew/roles.md           who does what, and who may write
crew/handoffs.md        how work moves between roles
crew/hitl.md            fail-closed human gates
crew/board.md           blank task-card template
crew/board.example.md   filled feature board a peer can copy (Planner → Human)
docs/walkthrough.md     end-to-end hop-by-hop run (filled payloads); pair with sibling kits
docs/anti-patterns.md   silent handoff · merge-on-green · invent approval · crew without evidence · board without Reviewer evidence
docs/paste-into-host.md short paste starter for any host; pair with sibling kits
```

## What belongs here

Improvements to the crew contracts above — clearer jobs, explicit message contracts, stricter gates, better examples, a clearer end-to-end walkthrough, a clearer paste starter, and concrete anti-patterns (not a new role).

This repo is **not** a vendor SDK, a prompt dump, or a client playbook. Do not add framework-specific APIs, secrets, or private process detail.

## Quality bar

Keep the crew **simple, composable, and inspectable**. Public multi-agent materials converge on the same bar; use them as pattern references, not as dependencies:

| Pattern | What to copy into our docs |
|---|---|
| [Orchestrator / workers](https://www.anthropic.com/engineering/building-effective-agents) | Planner decomposes; workers stay in scope; show the plan. Add complexity only when it measurably helps. |
| [Crew roles + tasks](https://docs.crewai.com) | Each role has a job and an objective. Each task has an owner, a description, and an **expected output**. Sequential vs hierarchical process is explicit. |
| [Conversation / sequential handoff](https://microsoft.github.io/autogen/) | Named next hop. Typed payload. No silent handoff. |
| [HITL interrupts](https://langchain-ai.github.io/langgraph/) | Pause before privileged actions. Persist the ask. Resume only with an explicit human decision. Do not invent approval. |

A useful change is **concrete**: one extra rule, one example card, one `path:line` review habit — not a new abstraction.

## How to improve roles (`crew/roles.md`)

For each role, keep three things obvious (the crew-style contract, vendor-neutral):

1. **Job** — one sentence (Planner decomposes; Implementer writes in scope; Reviewer evaluates; Ops ships).
2. **Objective** — what “done” looks like for that role.
3. **Write boundary** — writes vs comment-only, and whether HITL is required.

Planner is the orchestrator: it owns the goal and the board, and it does **not** edit production code. Reviewer is the evaluator loop: findings with evidence, or explicit LGTM — never a silent merge.

Prefer denser roles (acceptance criteria, out-of-scope, tools) over new role names. Four roles is enough unless a gap is proven.

## How to improve handoffs (`crew/handoffs.md`)

Treat each hop as a **message protocol**, not a vibe:

| Hop | Payload (minimum) |
|---|---|
| Planner → Implementer | Task card: scope, likely files, done-when |
| Implementer → Planner | Why the card is unworkable (missing done-when / scope) |
| Implementer → Reviewer | Diff + what / why / risk |
| Reviewer → Implementer | Findings with `path:line`, or LGTM |
| Reviewer → Ops | Approved change + residual risks |
| Ops → Human | Merge / deploy ask (HITL) |
| Human → Ops | Explicit `decision` + `decided_by` (never invent) |

Rule: no silent handoff. Write the card on `crew/board.md`. If a hop has no owner or no expected output, the docs are incomplete. A full filled run lives in `docs/walkthrough.md`. Wrong/right cards for silent handoff, merge-on-green, and invented approval: `docs/anti-patterns.md`. Do not grow that page into a playbook.

## How to improve HITL (`crew/hitl.md`)

Fail closed. A human is required before merge to the default branch, publish/deploy, secrets/billing/messaging as the user, or deleting data/repos.

Reads and local drafts may be optimistic. If unsure, **escalate** — do not invent approval.

When you add a gate, say: **what** pauses, **who** resumes, and **what happens if nobody answers** (wait; do not proceed). That is the interrupt/resume contract.

## Propose a change

1. Open an issue with the **Improve crew** form (`.github/ISSUE_TEMPLATE/improve-crew.yml`).
2. Point at the file and the gap (missing owner, vague done-when, gate that can be skipped).
3. Open a pull request that updates the smallest set of docs. Use `.github/PULL_REQUEST_TEMPLATE.md`.

```
# Issue first (or link an existing one), then a focused PR
git checkout -b docs/clarify-reviewer-handoff
```

## Before you open a PR

- [ ] English prose; English commands and paths
- [ ] Change is limited to crew docs (or Stage 0 hygiene files)
- [ ] Each touched role still has job, objective, and write boundary
- [ ] Each touched hop names the next owner and the payload
- [ ] HITL stays fail-closed; no implied auto-approve
- [ ] Four roles only (Human is the gate, not a crew seat)
- [ ] No client IP, no vendor lock-in, no new framework code
