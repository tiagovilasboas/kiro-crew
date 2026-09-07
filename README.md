# Kiro Crew

## Purpose / Propósito

**PT:** Mostrar **como montar um time de agents no Kiro** — papéis, handoffs e HITL — sem virar receita de cliente. Complementa o [playbook](https://github.com/tiagovilasboas/kiro-playbook) (skills/steerings) e o [tour](https://github.com/tiagovilasboas/kiro-tour-voomp) (onboarding).

**EN:** Show **how to run a multi-agent crew in Kiro** — roles, handoffs, HITL — without client IP. Complements the [playbook](https://github.com/tiagovilasboas/kiro-playbook) (skills/steerings) and the [tour](https://github.com/tiagovilasboas/kiro-tour-voomp) (onboarding).

**Não é / Not:** UI visualizer (`goe-agents`) · monorepo Jarvis · dump de prompts soltos.

Maintainer: [Tiago Montanha](https://github.com/tiagovilasboas) · Staff · Agentic AI

---

## Pattern vs example host

| Layer | Meaning |
|---|---|
| **Pattern** | Orchestrator (Planner) → workers (Implementer / Ops) → evaluator (Reviewer) → human gate |
| **Example host** | Kiro (this repo’s name). Skills and steerings live in whatever the host provides. |

Contracts live in `crew/`. To drop the pattern into another agentic IDE, start from [`docs/paste-into-host.md`](docs/paste-into-host.md).

---

## Crew (default)

| Role | Job | Writes? |
|---|---|---|
| **Planner** | Decompose goal → tasks | Board only |
| **Implementer** | Code / docs in scope | Yes → review |
| **Reviewer** | Diff vs guardrails | Comment only |
| **Ops** | CI, evals, ship checklist | Yes → HITL |

Details: [`crew/roles.md`](crew/roles.md) · handoffs: [`crew/handoffs.md`](crew/handoffs.md) · HITL: [`crew/hitl.md`](crew/hitl.md) · blank board: [`crew/board.md`](crew/board.md) · filled example: [`crew/board.example.md`](crew/board.example.md) · end-to-end walkthrough: [`docs/walkthrough.md`](docs/walkthrough.md) · agent layout: [`AGENTS.md`](AGENTS.md)

---

## Start

1. Read the end-to-end loop once: [`docs/walkthrough.md`](docs/walkthrough.md) (Planner → Implementer → Reviewer → Ops → Human, filled payloads).
2. Pick a goal (one sentence).
3. Planner fills [`crew/board.md`](crew/board.md) (shape reference: [`crew/board.example.md`](crew/board.example.md)).
4. Implementer works one task; Reviewer returns findings with `path:line` or LGTM.
5. Ops ships only after HITL on privileged writes.
6. Optional: paste the starter from [`docs/paste-into-host.md`](docs/paste-into-host.md) into your host.

---

## Related

- [kiro-playbook](https://github.com/tiagovilasboas/kiro-playbook) · [kiro-tour-voomp](https://github.com/tiagovilasboas/kiro-tour-voomp)
- [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) — brain · workers · ops
- [awesome-agentic-ai](https://github.com/tiagovilasboas/awesome-agentic-ai)
- Pattern refs (not dependencies): [Anthropic — effective agents](https://www.anthropic.com/engineering/building-effective-agents) · [CrewAI docs](https://docs.crewai.com) · [AutoGen](https://microsoft.github.io/autogen/) · [LangGraph HITL](https://langchain-ai.github.io/langgraph/)

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to improve roles, handoffs, and HITL docs.

## License

[MIT](LICENSE)
