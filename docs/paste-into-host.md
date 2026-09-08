# Paste into your host

Short starter for any agentic IDE. **Kiro is an example host**, not a requirement. Pattern contracts live in `crew/`. Host skills and vendor agent configs stay **outside** `crew/`.

Happy path: [`docs/walkthrough.md`](walkthrough.md). Wrong turns: [`docs/anti-patterns.md`](anti-patterns.md).

## Pattern (copy this)

```
Orchestrator (Planner) → workers (Implementer / Ops) → evaluator (Reviewer) → human gate
```

Four roles only unless you prove a gap:

| Role | Job | Writes? |
|---|---|---|
| Planner | Decompose goal → board tasks | Board only |
| Implementer | One task; in-scope diff | Yes → open for review |
| Reviewer | Findings with `path:line` or LGTM | Comment only |
| Ops | CI + ship ask | Merge/deploy only after HITL |

## Paste checklist

1. Copy `crew/roles.md`, `crew/handoffs.md`, `crew/hitl.md`, `crew/board.md` into the host workspace (or link them).
2. Planner fills the board (copy: `crew/board.example.md`; hop movie: `docs/walkthrough.md`).
3. Every hop names **next owner** + **payload** (no silent handoff).
4. Reviewer never merges; Ops never ships on silence.
5. HITL before: default-branch merge, deploy/publish, secrets/billing/messaging-as-user, deletes.

## Where this card lives

| | **Kiro (example host)** | **Any host (`AGENTS.md`)** |
|---|---|---|
| Blank | `crew/board.md` in the workspace | Same path, listed under Layout in `AGENTS.md` |
| Live filled card | Duplicate or PR description the human can reopen tomorrow | Persist next to `AGENTS.md` or on the PR — chat is not the board |
| Skills / agent config | Host skills / steerings — **outside** `crew/` | Host agent files — **outside** `crew/` |

Copy the filled feature: [`crew/board.example.md`](../crew/board.example.md). Do not encode vendor APIs inside `crew/`.

## Pair with siblings

This paste is the **crew loop**. Sibling kits stay **outside** `crew/` — pair them; do not absorb them into a second architecture repo. Kiro remains an example host.

| Need | Sibling | Pairing |
|---|---|---|
| Reviewer AppSec | [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review) | Load skills on Reviewer. Findings are `path:line` or silence. |
| Ops evidence | [agent-measurement](https://github.com/tiagovilasboas/agent-measurement) | Suites, named metrics, markdown reports — not vibes. CI green is still not HITL. |
| Layer model | [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) | Brain · workers · ops. Swap the host; keep the domain. |
| Desktop CoS | [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture) | Chief-of-staff, specialists, shared computer. Those labels are that kit — not extra seats here. |
| Curated filter | [awesome-agentic-ai](https://github.com/tiagovilasboas/awesome-agentic-ai) | MCP · harness · agent security. Decision filter, not a crew. |

## Minimal HITL line (pin this)

```
If unsure → escalate. Do not invent approval. No answer ⇒ wait.
```

## What not to paste

- Client playbooks, private runbooks, or secret material
- Framework SDK code as if this repo depended on it
- Extra roles “for clarity” before the four-role loop is working
- Sibling kit files into `crew/` (skills, ADRs, evals stay in those repos)
- Silent chat as a handoff, merge because CI is green, or `decided_by: auto` — see [`docs/anti-patterns.md`](anti-patterns.md)

## Refs (patterns only)

- [Building effective agents — orchestrator/workers](https://www.anthropic.com/engineering/building-effective-agents)
- [CrewAI — roles, tasks, expected output](https://docs.crewai.com)
- [AutoGen — conversation / handoff](https://microsoft.github.io/autogen/)
- [LangGraph — HITL interrupts](https://langchain-ai.github.io/langgraph/)
