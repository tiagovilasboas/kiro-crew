# Kiro Crew

## Purpose / Propósito

**PT:** Mostrar **como montar um time de agents no Kiro** — papéis, handoffs e HITL — sem virar receita de cliente. Complementa o [playbook](https://github.com/tiagovilasboas/kiro-playbook) (skills/steerings) e o [tour](https://github.com/tiagovilasboas/kiro-tour-voomp) (onboarding).

**EN:** Show **how to run a multi-agent crew in Kiro** — roles, handoffs, HITL — without client IP. Complements the [playbook](https://github.com/tiagovilasboas/kiro-playbook) (skills/steerings) and the [tour](https://github.com/tiagovilasboas/kiro-tour-voomp) (onboarding).

**Não é / Not:** UI visualizer (`goe-agents`) · monorepo Jarvis · dump de prompts soltos.

Maintainer: [Tiago Montanha](https://github.com/tiagovilasboas) · Staff · Agentic AI

---

## Crew (default)

| Role | Job | Writes? |
|---|---|---|
| **Planner** | Decompose goal → tasks | No |
| **Implementer** | Code / docs in scope | Yes → HITL |
| **Reviewer** | Diff vs guardrails | Comment only |
| **Ops** | CI, evals, ship checklist | Yes → HITL |

Details: [`crew/roles.md`](crew/roles.md) · handoffs: [`crew/handoffs.md`](crew/handoffs.md) · HITL: [`crew/hitl.md`](crew/hitl.md) · agent layout: [`AGENTS.md`](AGENTS.md)

---

## Start

1. Pick a goal (one sentence).
2. Planner fills `crew/board.md` template.
3. Implementer works one task; Reviewer uses [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review) skills.
4. Ops ships only after HITL on writes.

---

## Related

- [kiro-playbook](https://github.com/tiagovilasboas/kiro-playbook) · [kiro-tour-voomp](https://github.com/tiagovilasboas/kiro-tour-voomp)
- [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) — brain · workers · ops
- [awesome-agentic-ai](https://github.com/tiagovilasboas/awesome-agentic-ai)

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to improve roles, handoffs, and HITL docs.

## License

[MIT](LICENSE)
