# Agents

This repo is a **crew pattern**, not a Kiro-only recipe. Map the same four roles onto any agentic IDE.

## Layout

```
crew/roles.md           Planner · Implementer · Reviewer · Ops
crew/handoffs.md        explicit hops (owner + payload)
crew/hitl.md            fail-closed interrupts before privileged writes
crew/board.md           blank task card the Planner fills
crew/board.example.md   filled walkthrough of the board
docs/walkthrough.md     end-to-end Planner → … → Human with filled payloads; pair with sibling kits
docs/anti-patterns.md   silent handoff · merge-on-green · invent approval · crew without evidence
docs/paste-into-host.md short starter to paste into another host; pair with sibling kits
```

## Pattern vs example host

| | **Pattern** | **Example host** |
|---|---|---|
| What | Orchestrator (Planner) → workers (Implementer / Ops) → evaluator (Reviewer) → human gate | Kiro (this repo’s name). Same cards paste into any agentic IDE. |
| File home | `crew/` | Skills and steerings — **outside** `crew/` |

Do not encode vendor APIs here. If a host needs extra files (agent configs, skills), keep them out of `crew/` and keep the contracts above as the source of truth. Sibling kits (AppSec review, evals, layer model, desktop CoS, curated list) stay outside `crew/` — pair Reviewer with `path:line` skills and Ops with suites; do not absorb those repos here.

See [CONTRIBUTING.md](CONTRIBUTING.md) before changing crew docs. End-to-end loop: [docs/walkthrough.md](docs/walkthrough.md). Anti-patterns: [docs/anti-patterns.md](docs/anti-patterns.md). Paste starter: [docs/paste-into-host.md](docs/paste-into-host.md).
