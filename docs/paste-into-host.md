# Paste into your host

Short starter for any agentic IDE. **Kiro is an example host**, not a requirement. Keep contracts in your copy of `crew/`; put vendor agent configs outside `crew/`.

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
2. Planner fills the board (see shape in `crew/board.example.md`).
3. Every hop names **next owner** + **payload** (no silent handoff).
4. Reviewer never merges; Ops never ships on silence.
5. HITL before: default-branch merge, deploy/publish, secrets/billing/messaging-as-user, deletes.

## Minimal HITL line (pin this)

```
If unsure → escalate. Do not invent approval. No answer ⇒ wait.
```

## What not to paste

- Client playbooks, private runbooks, or secret material
- Framework SDK code as if this repo depended on it
- Extra roles “for clarity” before the four-role loop is working

## Refs (patterns only)

- [Building effective agents — orchestrator/workers](https://www.anthropic.com/engineering/building-effective-agents)
- [CrewAI — roles, tasks, expected output](https://docs.crewai.com)
- [AutoGen — conversation / handoff](https://microsoft.github.io/autogen/)
- [LangGraph — HITL interrupts](https://langchain-ai.github.io/langgraph/)
