# Why this repo is not jarvis-architecture

Short split. Three repos, three jobs. This one is the smallest.

## jarvis-architecture

Use [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) when the question is **what layers exist** and how they swap hosts.

That repo owns brain · workers · ops, the handoff envelope ADR, and HITL-on-writes as a vendor-agnostic rule. Goose, Cursor, Codex, and Kiro are examples there, not the product.

If you want another ADR or a host-swap note, open it there. Do not paste it here.

## grok-bot-architecture

Use [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture) when the question is a **desktop assistant OS**: chief-of-staff, specialists, shared computer, connectors.

Those specialist labels (Inbox, Código, Vitrine, and the rest) are that kit. They are not extra seats in this adapter.

## kiro-crew (this repo)

Use this repo when you are **already in Kiro** and need files to drop in.

What is unique here:

- Paste path: `pack/steering/` and `pack/hooks/` into `.kiro/`
- Steering and hook constraints (inclusion modes, custom-agent `resources`, hook exit `2` blocks)
- Board that can live as `crew/board.md` or a Kiro spec under `.kiro/specs/`
- One machine-checked handoff fixture (`examples/handoff.*.json`)

What is **not** unique here (on purpose):

- Four-role theory (Planner / Implementer / Reviewer / Ops)
- Fail-closed HITL as an idea (jarvis ADR 0002)
- Desktop CoS topology

Those pages used to live in this repo as a third brochure. They were deleted so Staff does not maintain the same manifesto three times.

## Pick one

| You need | Open |
|---|---|
| Layers, ADRs, host swap | jarvis-architecture |
| Desktop CoS + connectors | grok-bot-architecture |
| Kiro steering / hooks / spec board | this repo |

If a change is true for every host, it is a jarvis change. If it is only true because Kiro stores context in `.kiro/`, it belongs here.
