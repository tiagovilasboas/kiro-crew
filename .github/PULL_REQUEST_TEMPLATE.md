## Why

What gap in roles, handoffs, HITL, or repo hygiene does this close?

## What

What files changed, in one short list?

## How to verify

Commands and paths in English:

```
# Example
ls crew/roles.md crew/handoffs.md crew/hitl.md crew/board.md
```

- [ ] Docs stay harness-agnostic (Kiro is an example host, not a lock-in)
- [ ] Handoffs name the next owner and the payload
- [ ] HITL stays fail-closed (no implied auto-approve)
- [ ] No client IP and no vendor SDK code
