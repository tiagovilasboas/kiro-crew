# HITL (fail closed)

Human-in-the-loop is an **interrupt / resume** contract: pause before privileged actions, persist the ask, resume only with an explicit human decision. Do not invent approval.

Pattern reference: [LangGraph interrupts](https://langchain-ai.github.io/langgraph/) (pattern only — this repo is harness-agnostic).

## Always interrupt (human required)

| Action | Why | Who resumes |
|---|---|---|
| Merge to default branch | Ships to everyone | Human maintainer |
| Publish package / deploy | External blast radius | Human on-call / owner |
| Secrets, billing, or messaging as the user | Irreversible or identity-bound | Human account owner |
| Deleting data or repos | Destructive | Human owner |

## May proceed without interrupt

- Reads (repo, issues, CI logs)
- Local drafts and branches that do not ship
- Comments / review notes
- Filling `crew/board.md` (Planner)

If unsure → **escalate**. Optimistic only for reads and local drafts.

## Interrupt record (minimum)

Ops (or the role about to do the privileged write) must persist:

```
action: merge | deploy | secret_use | delete | other
target: <branch, env, resource>
blast_radius: <one sentence>
rollback: <one sentence>
residual_risks: <from Reviewer, or none>
decision: approve | reject | defer   # filled by human
decided_by: <name>
if_no_answer: wait — do not proceed
```

## Resume rules

1. Resume only when `decision` is an explicit human `approve` (or clear reject/defer).
2. Silence, emoji reactions, or "LGTM" from Reviewer alone are **not** approval to merge/deploy.
3. A rejected ask returns to Planner or Implementer with the reason — do not retry the same privileged write.
4. Deferred asks stay paused; do not time out into approve.

## Filled records

Same example run as [`docs/walkthrough.md`](../docs/walkthrough.md). Template fields above stay the contract; these are typed cards.

Approve:

```
action: merge
target: branch docs/security-md → default branch
blast_radius: documentation only (SECURITY.md + README link)
rollback: revert the merge commit
residual_risks: forks may lack private reporting; usual docs drift
decision: approve
decided_by: maintainer
if_no_answer: wait — do not proceed
```

Reject (do not retry the same privileged write):

```
action: merge
target: branch docs/security-md → default branch
blast_radius: documentation only
rollback: n/a (not merged)
residual_risks: publishing a reporting path before private reporting is enabled
decision: reject
decided_by: maintainer
reason: Enable private reporting on origin first.
next_owner: Planner
if_no_answer: wait — do not proceed
```

## Examples

**Docs-only merge (still HITL)**  
Ops asks to merge a documentation PR. Human approves. Ops merges.  
Even low blast radius stays fail-closed so the habit does not rot.

**Deploy with residual risk**  
Reviewer LGTM lists "feature flag default off". Ops HITL ask includes that risk and rollback ("flip flag / revert"). Human approves deploy. Ops ships.

**Secret rotation**  
Implementer must not paste live secrets into chat. Ops opens HITL: "rotate key X in vault Y". Human performs or explicitly delegates the vault action.

## Anti-patterns

| Anti-pattern | Correct behavior |
|---|---|
| "CI green ⇒ merge" | Interrupt; wait for human |
| "User said fix it yesterday ⇒ deploy today" | New ask for deploy; scope may have changed |
| Agent invents `decided_by: auto` | Forbidden — escalate |
| HITL ask without rollback | Incomplete — fill rollback before asking |
