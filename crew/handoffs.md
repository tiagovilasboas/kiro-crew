# Handoffs

Each hop is a **message protocol**: named next owner + typed payload. No silent handoff. Write the live card on [`board.md`](board.md). Board shape: [`board.example.md`](board.example.md). Full loop with filled payloads: [`docs/walkthrough.md`](../docs/walkthrough.md).

Pattern references: [orchestrator → workers](https://www.anthropic.com/engineering/building-effective-agents), [task expected output](https://docs.crewai.com), [named conversation handoff](https://microsoft.github.io/autogen/).

## Protocol table

| Hop | Next owner | Payload (minimum) | Expected output |
|---|---|---|---|
| Planner → Implementer | Implementer | Task card: ID, scope, files likely, done-when, out-of-scope | One in-scope diff + what/why/risk |
| Implementer → Planner | Planner | Why the card is unworkable (missing done-when / scope) | Revised card or parked goal |
| Implementer → Reviewer | Reviewer | Diff locator + summary (what / why / risk) + done-when claim | Findings with `path:line`, or LGTM + residual risks |
| Reviewer → Implementer | Implementer | Findings list (location, problem, fix direction) | Reworked diff addressing each finding |
| Reviewer → Ops | Ops | Approved change id + residual risks + CI hint | Ship checklist + HITL ask |
| Ops → Human | Human | Merge/deploy ask: blast radius, rollback, residual risks | Explicit approve / reject / defer |
| Human → Ops | Ops | `decision` + `decided_by` (reject/defer include reason) | Merge/deploy, or return to Planner — never invent this hop |

Rule: if a hop has no owner or no expected output, stop and fix the board before continuing.

## Example payloads (same goal as `board.example.md`)

### Planner → Implementer (T1)

```
task_id: T1
owner: Implementer
scope: Add docs/paste-into-host.md with a short starter that names four roles and HITL.
files_likely: docs/paste-into-host.md, README.md
done_when: File exists; README links it; no vendor SDK code.
out_of_scope: New roles, host-specific agent configs, playbook dumps.
```

### Implementer → Reviewer

```
change: docs/paste-into-host.md (new), README.md (Start section link)
what: Paste starter for any agentic IDE.
why: Hosts were inventing handoff payloads.
risk: Starter could be read as Kiro-only — mitigated by "example host" wording.
done_when_claim: ls docs/paste-into-host.md && grep -n paste-into-host README.md
```

### Reviewer → Implementer (changes requested)

```
verdict: changes_requested
findings:
  - loc: docs/paste-into-host.md:12
    problem: Implies auto-merge after LGTM.
    fix: State Ops → Human HITL before merge.
```

### Reviewer → Ops (LGTM)

```
verdict: LGTM
change: PR (or local branch) for paste-into-host starter
residual_risks: None for docs-only; still require human merge to default branch.
ci: n/a or docs path green
```

### Ops → Human

```
ask: merge to default branch
blast_radius: documentation only
rollback: revert commit
residual_risks: none beyond usual docs drift
decision_needed: approve | reject | defer
if_no_answer: wait (do not merge)
```

### Human → Ops (resume)

```
decision: approve
decided_by: maintainer
action: merge
```

Silence is not this hop. A full reject/defer + rework loop: [`docs/walkthrough.md`](../docs/walkthrough.md).

## Anti-patterns

| Anti-pattern | Fix |
|---|---|
| "Implementer, just fix it" with no card | Planner fills board first |
| Reviewer says "LGTM" in chat only | Persist verdict + residual risks on the board or PR |
| Ops merges because CI is green | HITL still required for default-branch merge |
| Two Implementer tasks in flight, one PR | One task → one reviewable change unless Planner says otherwise |
| Implementer guesses a missing done-when | Hop back to Planner; do not invent acceptance |
