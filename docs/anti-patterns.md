# Crew anti-patterns

Companion to [`docs/walkthrough.md`](walkthrough.md) (happy path). Other IDE: [`docs/paste-into-host.md`](paste-into-host.md). Contracts stay in [`crew/roles.md`](../crew/roles.md), [`crew/handoffs.md`](../crew/handoffs.md), [`crew/hitl.md`](../crew/hitl.md). This page is four ways hosts skip the protocol.

Same example goal as the walkthrough (`SECURITY.md`). Copy the **shape**. Do not treat these cards as live work on this repo.

## Pattern vs example host

| | **Pattern** | **Example host** |
|---|---|---|
| What | Four roles · named hops · fail-closed HITL · the board | Skills, steerings, vendor agent configs |
| File home | `crew/` (source of truth) | Your IDE — **outside** `crew/` |
| This repo’s name | Not a runtime | Kiro. Paste the same cards into any agentic IDE |

If you copy Kiro skill paths into `crew/`, you locked the pattern to one vendor. If you add a fifth role so the host “has somewhere to put research”, you skipped Planner homework. Human is the **gate**, not a crew seat.

---

## 1. Silent handoff

Chat with no `next_owner` and no payload is not a hop.

**Wrong**

```
Implementer, go ahead and add SECURITY.md.
```

Nobody can replay scope, done-when, or who owes the next card tomorrow. Silent chat dies with the thread.

**Right** — persist on the board (Planner → Implementer):

```
task_id: T1
next_owner: Implementer
scope: Add SECURITY.md with a public reporting path. Link it from README.
files_likely: SECURITY.md, README.md
done_when:
  - SECURITY.md exists
  - README links to it
  - No mailbox, phone, SLA, or client/org-internal name
expected_output: one in-scope diff + what/why/risk
```

If a hop has no owner or no expected output, stop and fix the board. Implementer refuses a card with missing done-when (`next_owner: Planner`) — they do not guess.

---

## 2. Merge-on-green

Green CI is a **status**. It is not a human decision. Reviewer LGTM is not merge. Docs-only still waits.

**Wrong**

```
task_id: T3
ci: green
verdict: LGTM
action_taken: merge docs/security-md to default branch
decided_by: ci
```

Ops skipped Ops → Human. Default-branch merge ships to everyone, markdown included.

**Right** — interrupt record, then wait:

```
action: merge
target: branch docs/security-md → default branch
blast_radius: documentation only (SECURITY.md + README link). No runtime, no secrets.
rollback: revert the merge commit
residual_risks:
  - Forks may lack private reporting
  - Usual docs drift
ci: green / n/a docs-only
decision:            # human fills
decided_by:          # human fills
if_no_answer: wait — do not merge
```

Ops does not treat “it was green yesterday” as a skip of Reviewer, and does not merge on silence. **Crew without evidence** is the same skip: merge-on-green without Reviewer `path:line` (CI status, no locator, no suite). Pair Reviewer with AppSec skills and Ops with suites — not vibes. HITL still waits. A board that marks Reviewer `done` without that locator is the same theater — section 4.

---

## 3. Invent approval

Resume requires an explicit human `decision` + `decided_by` **on this ask**. Silence, emoji, last week’s “ship it”, and Reviewer LGTM do not fill those fields.

**Wrong**

```
decision: approve
decided_by: auto
# or: decided_by: user said ship it last Tuesday
# or: decided_by: reviewer LGTM
```

**Right** — Human → Ops, or the hop does not exist:

```
decision: approve
decided_by: maintainer
note: Merge the docs. Leave private reporting as a host setting; do not invent a mailbox later.
```

Reject and defer are also explicit. Defer does not age into approve. If nobody answers, there is no resume hop — the interrupt stays open.

---

## 4. Board without Reviewer evidence

A filled task table is not a crew. If Reviewer is `done` or `LGTM` with no `path:line` and no residual risks, the board is theater. Copy the filled feature: [`crew/board.example.md`](../crew/board.example.md).

**Wrong**

```
| T2 | Reviewer | Review the PR | (diff) | Looks fine | done |
```

No locator, no residual risks, next owner unnamed. Ops cannot copy evidence onto the HITL ask.

**Right** — persist the verdict on the board (same shape as the filled example):

```
verdict: changes_requested
findings:
  - loc: src/status/handler.ts:18
    problem: Body includes hostname. Card forbids hostnames in the JSON.
    fix: Drop the field.
```

Then, after rework, `verdict: LGTM` plus residual risks. Ops copies those risks onto the interrupt. Silence / “looks fine” is not evidence.

---

## Four roles. Stop there.

| Invented name | Who already owns that work |
|---|---|
| Researcher | Planner (decompose, write out-of-scope) |
| QA | Reviewer (`path:line` vs the card) or Implementer (local checks the card names) |
| Human-as-crew | Gate on Ops → Human. Not a seat in `crew/roles.md`. |
| Host-specific “Kiro agent” | Example host. Skills stay outside `crew/`. |

Prove this loop is boring before you add a name.

---

## If you catch one live

Do not patch it in chat. Write the missing payload on the board (or the PR), name `next_owner`, continue from there. Replay the happy path in [`docs/walkthrough.md`](walkthrough.md).
