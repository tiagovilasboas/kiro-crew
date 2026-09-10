# Kiro Crew

This repo is the Kiro-specific paste pack / host adapter. Generic brain · workers · ops lives in [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture). The desktop chief-of-staff pattern lives in [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture). Here we only keep what differs for Kiro.

Maintainer: [Tiago Montanha](https://github.com/tiagovilasboas) · Staff · Agentic AI

## When to use which

| Repo | Use it for |
|---|---|
| [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) | Vendor-agnostic layers, ADRs, host swap |
| [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture) | Desktop CoS, specialists, shared computer |
| **This repo** | Paste into Kiro: steering, hooks, spec-shaped board, one checked handoff |

Honest split: [`docs/why-not-jarvis.md`](docs/why-not-jarvis.md).

## Paste into Kiro

1. Read [`docs/paste-into-kiro.md`](docs/paste-into-kiro.md).
2. Copy `pack/steering/` → `.kiro/steering/` and `pack/hooks/` → `.kiro/hooks/` in the target workspace.
3. Planner fills [`crew/board.md`](crew/board.md) (copy: [`crew/board.example.md`](crew/board.example.md)). Prefer a Kiro spec under `.kiro/specs/` when the host already uses specs.
4. Persist every hop as JSON in the fixture shape. Privileged writes need `"hitl": true`.

Kiro mapping (not a second architecture): [`crew/roles.md`](crew/roles.md) · hops: [`crew/handoffs.md`](crew/handoffs.md) · HITL binding: [`crew/hitl.md`](crew/hitl.md).

## Checked artifact

CI does not re-test multi-agent theory. It checks one handoff envelope.

| File | Expected |
|---|---|
| [`examples/handoff.fixed.json`](examples/handoff.fixed.json) | Valid privileged write with HITL |
| [`examples/handoff.broken.json`](examples/handoff.broken.json) | Rejected: merge without `hitl: true` |

```
sh scripts/check-fixtures.sh
```

Validator: [`scripts/validate-handoff.js`](scripts/validate-handoff.js) (Node, zero deps). Workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Related

Siblings, not copies of this adapter:

- [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) - brain · workers · ops
- [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture) - desktop CoS
- [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review) - Reviewer `path:line` skills
- [agent-measurement](https://github.com/tiagovilasboas/agent-measurement) - Ops suites
- [awesome-agentic-ai](https://github.com/tiagovilasboas/awesome-agentic-ai) - curated filter

Kiro refs: [Steering](https://kiro.dev/docs/steering/) · [Hooks](https://kiro.dev/docs/ide/whats-new-v1/hooks/) · [How Kiro works](https://kiro.dev/docs/how-kiro-works/)

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Pattern changes belong in jarvis. Desktop CoS changes belong in grok-bot.

## License

[MIT](LICENSE)

## AGENTS.md

[`AGENTS.md`](AGENTS.md)
