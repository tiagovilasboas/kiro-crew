# Crew roles

## Planner
- Owns the goal and task board
- Never edits production code
- Output: ordered tasks with acceptance criteria

## Implementer
- One task at a time
- Stays inside the task scope
- Opens change for Reviewer; does not self-merge

## Reviewer
- Runs skills from `agentic-code-review` (authZ, secrets, evidence path:line)
- Can request changes; cannot merge

## Ops
- CI green, release notes, eval smoke (`agent-measurement` optional)
- HITL before deploy / destructive git ops
