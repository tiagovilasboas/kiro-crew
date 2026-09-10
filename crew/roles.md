# Roles on Kiro

Jobs and write boundaries are defined in [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) (brain · workers · ops). This page is the **Kiro surface map** only.

| Role | Jarvis layer | Kiro surface | Writes? |
|---|---|---|---|
| Planner | Brain | Spec (`.kiro/specs/<id>/`) and/or [`board.md`](board.md) | Board / spec only |
| Implementer | Worker | One spec task; in-scope file edits | Yes → open for review |
| Reviewer | Worker (eval) | PR comments or spec notes with `path:line` | Comment only |
| Ops | Ops | CI status + handoff JSON; optional hook | Privileged write only after HITL |

Human is the gate on the interrupt, not a fifth seat.

**Does not belong here:** Researcher, QA, or a "Kiro agent" role. Custom agents are a host profile, not a crew seat. Always-on steering must not invent extra jobs.

Planner never edits production code. Reviewer never merges. Ops never fills `decided_by`.
