# Kiro Crew

Multi-agent crew pattern — roles, handoffs, HITL. Kiro is the example host.

Maintainer: [Tiago Montanha](https://github.com/tiagovilasboas) · Staff · Agentic AI

## Pattern vs host

| | **Pattern** | **Example host** |
|---|---|---|
| What | Orchestrator (Planner) → workers (Implementer / Ops) → evaluator (Reviewer) → human gate | Kiro (this repo’s name). Same cards paste into any agentic IDE. |
| File home | `crew/` | Skills and steerings — **outside** `crew/` |

Contracts live in `crew/`. To drop the pattern into another agentic IDE, start from [`docs/paste-into-host.md`](docs/paste-into-host.md).

## Crew

| Role | Job | Writes? |
|---|---|---|
| **Planner** | Decompose goal → tasks | Board only |
| **Implementer** | Code / docs in scope | Yes → review |
| **Reviewer** | Diff vs guardrails | Comment only |
| **Ops** | CI, evals, ship checklist | Yes → HITL |

Details: [`crew/roles.md`](crew/roles.md) · handoffs: [`crew/handoffs.md`](crew/handoffs.md) · HITL: [`crew/hitl.md`](crew/hitl.md) · blank board: [`crew/board.md`](crew/board.md) · filled example: [`crew/board.example.md`](crew/board.example.md)

## Start

| | |
|---|---|
| Happy path | [`docs/walkthrough.md`](docs/walkthrough.md) — Planner → Implementer → Reviewer → Ops → Human |
| Wrong turns | [`docs/anti-patterns.md`](docs/anti-patterns.md) — silent handoff · merge-on-green · invent approval |
| Other IDE | [`docs/paste-into-host.md`](docs/paste-into-host.md) — four roles + fail-closed HITL |

One-sentence goal → Planner fills [`crew/board.md`](crew/board.md) (shape: [`crew/board.example.md`](crew/board.example.md)) → one task → Reviewer `path:line` or LGTM → Ops ships only after HITL.

## Related

- [kiro-playbook](https://github.com/tiagovilasboas/kiro-playbook) — host skills · steerings · hooks
- [kiro-tour-voomp](https://github.com/tiagovilasboas/kiro-tour-voomp) — Kiro host tour
- [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) — brain · workers · ops
- [awesome-agentic-ai](https://github.com/tiagovilasboas/awesome-agentic-ai) — MCP · harness · HITL
- Pattern refs (not dependencies): [Anthropic — effective agents](https://www.anthropic.com/engineering/building-effective-agents) · [CrewAI docs](https://docs.crewai.com) · [AutoGen](https://microsoft.github.io/autogen/) · [LangGraph HITL](https://langchain-ai.github.io/langgraph/)

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to improve roles, handoffs, and HITL docs.

## License

[MIT](LICENSE)

## AGENTS.md

Agent notes: [`AGENTS.md`](AGENTS.md).
