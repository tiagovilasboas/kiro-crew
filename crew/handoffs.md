# Handoffs

1. **Planner → Implementer:** task card with scope, files likely touched, done-when.
2. **Implementer → Reviewer:** diff + short summary (what / why / risk).
3. **Reviewer → Implementer:** findings with `path:line` or explicit LGTM.
4. **Reviewer → Ops:** approved change + residual risks.
5. **Ops → Human:** merge/deploy ask (HITL).

Rule: no silent handoff — write the card on `board.md`.
