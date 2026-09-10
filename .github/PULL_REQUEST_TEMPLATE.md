## Why

What Kiro-delta gap does this close (paste step, steering/hook constraint, board persist, fixture field)?

## What

What files changed, in one short list?

## How to verify

Commands and paths in English:

```
sh scripts/check-fixtures.sh
```

- [ ] Change is Kiro-delta (not a restated jarvis / grok-bot manifesto)
- [ ] Handoffs name the next owner and the payload
- [ ] HITL stays fail-closed (no implied auto-approve)
- [ ] Privileged writes without `hitl: true` still fail the checker
- [ ] No client IP; pack files stay Kiro-only
