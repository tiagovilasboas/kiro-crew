# Agents

This repo is a **crew pattern**, not a Kiro-only recipe. Map the same four roles onto any agentic IDE.

## Layout

```
crew/roles.md           Planner · Implementer · Reviewer · Ops
crew/handoffs.md        explicit hops (owner + payload)
crew/hitl.md            fail-closed interrupts before privileged writes
crew/board.md           blank task card the Planner fills
crew/board.example.md   filled walkthrough of the board
docs/walkthrough.md     end-to-end Planner → … → Human with filled payloads
docs/paste-into-host.md short starter to paste into another host
```

## Pattern vs example host

| Layer | Meaning |
|---|---|
| Pattern | Orchestrator (Planner) → workers (Implementer / Ops) → evaluator (Reviewer) → human gate |
| Example host | Kiro (this repo’s name). Skills and steerings live in whatever the host provides. |

Do not encode vendor APIs here. If a host needs extra files (agent configs, skills), keep them out of `crew/` and keep the contracts above as the source of truth.

See [CONTRIBUTING.md](CONTRIBUTING.md) before changing crew docs. End-to-end loop: [docs/walkthrough.md](docs/walkthrough.md). Paste starter: [docs/paste-into-host.md](docs/paste-into-host.md).
