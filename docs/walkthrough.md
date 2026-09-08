# End-to-end crew walkthrough

One sitting. Four roles. Every hop is a **named next owner + a filled payload** — not angle brackets, not “just fix it”.

This file is the movie. The contracts stay in [`crew/roles.md`](../crew/roles.md), [`crew/handoffs.md`](../crew/handoffs.md), [`crew/hitl.md`](../crew/hitl.md). The board shape is [`crew/board.md`](../crew/board.md).

## Pattern vs example host

| | **Pattern** | **Example host** |
|---|---|---|
| Loop | Planner → Implementer → Reviewer → (rework) → Ops → Human → Ops resumes | Kiro (this repo’s name). Same cards paste into any agentic IDE. |
| File home | `crew/` — roles, hops, HITL, board | Skills / steerings / vendor configs — **outside** `crew/` |

Nobody here is a runtime. Human is the gate, not a fifth role. If your host cannot persist a board, write the card somewhere a human can still read it tomorrow.

**Not this file:** a client playbook, a vendor SDK, a fifth role, or live work on `kiro-crew`. Task IDs below are a **replayable example**. Copy the shape; do not treat `T1` as an open ticket in this repository.

Wrong turns: [`docs/anti-patterns.md`](anti-patterns.md). Other IDE: [`docs/paste-into-host.md`](paste-into-host.md).

---

## The goal (example)

A public repo already has the four-role crew. A human drops one sentence:

> Add a `SECURITY.md` that tells people how to report a vulnerability without leaking private contacts, promising an SLA, or naming clients.

Why this goal: it is small, public, and easy to get wrong. Reviewer will have something real to cite. Ops will still need HITL, because merge to the default branch ships to everyone — docs included.

---

## 1. Planner fills the board

Planner writes the card. Planner does **not** edit `SECURITY.md`.

```
goal: Add SECURITY.md that explains how to report a vulnerability without private contacts, SLAs, or client names.
out_of_scope:
  - Secret rotation or vault work
  - Bug-bounty program or response SLA
  - Host-specific agent configs
  - New crew roles
next_owner: Implementer
```

| ID | Owner | Scope | Files likely | Done when | Status |
|---|---|---|---|---|---|
| T1 | Implementer | Add `SECURITY.md` + README link | `SECURITY.md`, `README.md` | File exists; README links it; no email/SLA/client names | todo |
| T2 | Reviewer | Diff vs T1 done-when + HITL habit | (T1 diff) | `path:line` findings or LGTM + residual risks | todo |
| T3 | Ops | Docs sanity + merge ask | branch `docs/security-md` | Interrupt record persisted; human decision recorded | todo |

If a row is missing owner, files-likely, or done-when, Planner is not done. Implementer should refuse the card (hop back), not guess.

---

## 2. Planner → Implementer

```
task_id: T1
owner: Implementer
scope: Add SECURITY.md with a public reporting path. Link it from README.
files_likely: SECURITY.md, README.md
done_when:
  - SECURITY.md exists
  - README links to it
  - No mailbox, phone, SLA, or client/org-internal name
out_of_scope: vault rotation, bounty, new roles, vendor SDK
expected_output: one in-scope diff + what/why/risk
```

Implementer pulls **T1 only**. T2 and T3 are not this turn.

---

## 3. Implementer works T1 (first pass)

What landed (example — do not add these files to *this* repo unless you are actually doing that change):

- `SECURITY.md` — reporting path
- `README.md` — one link under Related / Security

The first draft is a little too helpful. That is the point.

```
# Security

Report vulnerabilities to security@example.com.
We respond within 24 hours.
Do not post exploits on Twitter.
```

Local claim (host-provided; paste the evidence, do not invent it):

```
ls SECURITY.md && grep -n SECURITY.md README.md
```

---

## 4. Implementer → Reviewer

```
task_id: T1
next_owner: Reviewer
change: SECURITY.md (new), README.md (link)
what: Public vulnerability reporting page + README pointer.
why: Repo had no reporting path; people were guessing.
risk: First draft may over-promise response time or leak a contact that is not a real mailbox.
done_when_claim: ls SECURITY.md && grep -n 'SECURITY.md' README.md
out_of_scope_held: no vault, no bounty, no new roles
```

Reviewer is comment-only. “Looks fine” in chat is not a verdict.

---

## 5. Reviewer → Implementer (changes requested)

Reviewer checks the diff against the **card**, not against vibes.

```
task_id: T1
verdict: changes_requested
next_owner: Implementer
findings:
  - loc: SECURITY.md:3
    problem: Invents mailbox security@example.com. That is a contact we do not own, and it reads like a real inbox.
    fix: Use the host’s private reporting (e.g. GitHub Security Advisories) or a public issue with “no secrets in the body”. No email.
  - loc: SECURITY.md:4
    problem: “We respond within 24 hours” is an SLA. Card forbids SLAs.
    fix: Delete the promise. Say we will look at complete reports; no timeline.
residual_risks: n/a until rework
```

This is the evaluator-optimizer loop. Reviewer does **not** rewrite `SECURITY.md`. Implementer does not start T3.

---

## 6. Implementer → Reviewer (rework)

Reworked page (shape, not a file in this repo):

```
# Security

If you think you found a vulnerability, use this repository’s private
vulnerability report if the host provides one. Otherwise open an issue
titled “Security report” and put no secrets, tokens, or exploit PoCs
in the body.

We will read complete reports. There is no promised response time.

Do not include client names, private runbooks, or production hosts.
```

Handoff:

```
task_id: T1
next_owner: Reviewer
change: SECURITY.md (rework), README.md (unchanged link)
what: Dropped invented mailbox and 24h SLA. Public/private reporting path only.
why: Reviewer findings at SECURITY.md:3 and SECURITY.md:4.
risk: Forks may have private reporting disabled; a reader might still file a public issue.
done_when_claim: grep -nE 'example.com|24 hours|SLA' SECURITY.md → no matches
addresses:
  - SECURITY.md:3 mailbox
  - SECURITY.md:4 SLA
```

---

## 7. Reviewer → Ops (LGTM)

```
task_id: T2
verdict: LGTM
next_owner: Ops
change: docs/security-md (SECURITY.md + README.md link)
ci: n/a (docs-only) — or paste the docs-path job URL if the host has one
residual_risks:
  - Private reporting can be off on forks; a report may land as a public issue.
  - Still require human merge to the default branch (HITL). Reviewer LGTM is not merge.
scope_check: no mailbox, no SLA, no client names — held
```

Reviewer does not press merge. Ops does not treat LGTM as approval to ship.

---

## 8. Ops → Human (HITL)

Ops may draft a one-line ship note. Ops may **not** merge on silence.

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
decision_needed: approve | reject | defer
```

That is the interrupt record from [`crew/hitl.md`](../crew/hitl.md). Incomplete ask (no rollback) → do not send it.

---

## 9. Human decides

Human is the gate, **not** a fifth crew role.

### Approve (this example)

```
decision: approve
decided_by: maintainer
note: Merge the docs. Leave private reporting as a host setting; do not invent a mailbox later.
```

Ops resumes: merge, then Planner marks T1–T3 done and closes the goal.

### Reject (same card, different day)

```
decision: reject
decided_by: maintainer
reason: We are not ready to publish a reporting path until private reporting is actually enabled on the origin repo.
next_owner: Planner
```

Ops does **not** retry the same merge. Planner re-opens scope or parks the goal.

### Defer

```
decision: defer
decided_by: maintainer
reason: Wait until the next docs window.
if_no_answer: still wait — defer does not age into approve
```

---

## 10. Ops resumes after approve

```
next_owner: Ops
human_decision: approve
action_taken: merge docs/security-md to default branch
evidence: merge commit SHA (paste the real one)
planner_followup: mark T1–T3 done; close the goal
```

If the human never answers, this hop does not exist. The interrupt stays open.

---

## Board after the loop

| ID | Owner | Status |
|---|---|---|
| T1 | Implementer | done |
| T2 | Reviewer | LGTM |
| T3 | Ops | done (human approve recorded) |

Handoff log (the short form you persist on the live board):

1. Planner → Implementer: T1 card (no mailbox / SLA / client names).
2. Implementer → Reviewer: first `SECURITY.md` (too helpful).
3. Reviewer → Implementer: `SECURITY.md:3` mailbox, `SECURITY.md:4` SLA.
4. Implementer → Reviewer: rework; grep claim.
5. Reviewer → Ops: LGTM + fork residual risk; HITL still required.
6. Ops → Human: merge ask; `if_no_answer: wait`.
7. Human → Ops: approve.
8. Ops merges; Planner closes the goal.

---

## Side paths (same four roles)

**Incomplete card.** Implementer does not start.

```
next_owner: Planner
reason: T1 has no done_when
```

**Scope creep.** Implementer wants to add a GitHub Action. That is not on the card. Ask Planner to add a task or say no. Do not sneak CI into a docs PR unless the board says so.

**CI red on a later, non-docs change.** Ops pastes the failing job URL, does not merge, does not skip Reviewer because “it was green yesterday”.

---

## Pair with siblings

Same four roles. Do not copy these kits into `crew/`. Paste table: [`docs/paste-into-host.md`](paste-into-host.md).

- **Reviewer** uses [agentic-code-review](https://github.com/tiagovilasboas/agentic-code-review) skills: `path:line` or silence — not “looks fine”.
- **Ops** records evidence with an [agent-measurement](https://github.com/tiagovilasboas/agent-measurement) mindset: suites and named metrics, not vibes. Green CI is still not HITL.
- **Layer model:** [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture) (brain · workers · ops). **Desktop CoS variant:** [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture). **Curated filter:** [awesome-agentic-ai](https://github.com/tiagovilasboas/awesome-agentic-ai).

## Honest limits

- This repo documents a crew. It does not spawn Planner for you.
- Kiro is an example host. If you copy-paste Kiro skill paths into `crew/`, you turned a pattern into a lock-in.
- Four roles are enough until this loop is boring. A “Researcher” or “QA” role is usually Planner or Reviewer with extra homework — see [`docs/anti-patterns.md`](anti-patterns.md).
- Docs-only still HITL. The habit dies the first time someone merges because “it is only markdown”.
- Residual risk on LGTM is not decoration. Ops must copy it onto the interrupt.
- A crew without evidence is theater: Reviewer still needs `path:line` (or silence); Ops still needs a suite, not vibes.

---

## Replay

1. Copy [`docs/paste-into-host.md`](paste-into-host.md) into your host (Kiro or otherwise).
2. Planner fills a **new** board from [`crew/board.md`](../crew/board.md). Do not reuse the `T1` IDs above as live work unless you mean it.
3. Run the hops in order. Persist each payload on the board or the PR.
4. Stop at Ops → Human. Wait.
5. If a hop looks like chat, merge-on-green without Reviewer `path:line`, or `decided_by: auto`, stop — [`docs/anti-patterns.md`](anti-patterns.md).

Related: filled board from Stage 1 (different goal) — [`crew/board.example.md`](../crew/board.example.md).
