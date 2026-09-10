# HITL on Kiro

Fail closed on privileged writes. The rule is jarvis ADR 0002. This page is the **Kiro binding**.

## Always interrupt

| Action | Kiro note |
|---|---|
| Merge to default branch | Ships on every surface that clones the repo |
| Publish / deploy | External blast radius |
| Secrets, billing, messaging as the user | Identity-bound |
| Delete data or repos | Destructive |

Reads, local drafts, review comments, and filling the board may proceed. If unsure, escalate.

## Binding

1. Ops persists an envelope with `"hitl": true` (see [`examples/handoff.fixed.json`](../examples/handoff.fixed.json)).
2. Optional: copy [`pack/hooks/privileged-writes.json`](../pack/hooks/privileged-writes.json) so `UserPromptSubmit` injects a stop prompt on merge/deploy language. That prompt is not approval.
3. Optional: a `command` hook that exits `2` on `PreToolUse` can block a tool. Exit `2` is the block code. Other non-zero is an error.
4. Resume only when a human sets `decision` and `decided_by` on **this** ask.
5. Silence, emoji, Reviewer LGTM, green CI, and `decided_by: auto` are not resume.

Incomplete ask (no `rollback`) must not be sent. The checker rejects privileged actions that omit `blast_radius` or `rollback`.
