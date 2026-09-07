# Crew roles

Four roles. Map them onto any agentic IDE. Pattern references (not dependencies): [orchestrator / workers](https://www.anthropic.com/engineering/building-effective-agents), [crew roles + tasks](https://docs.crewai.com), [conversation handoff](https://microsoft.github.io/autogen/), [HITL interrupts](https://langchain-ai.github.io/langgraph/).

Each role keeps three things obvious: **job**, **objective**, **write boundary**. Prefer denser contracts over new role names.

---

## Planner (orchestrator)

| | |
|---|---|
| **Job** | Decompose the goal into ordered tasks; own the board. |
| **Objective** | Every task has owner, scope, files-likely, done-when, and out-of-scope. Plan is visible. |
| **Writes?** | Board only (`crew/board.md`). Never production code. |

**Does**

- One-sentence goal on the board
- Split work so Implementer can finish one task without guessing
- Name the next hop (usually Implementer); never silent handoff
- Re-plan when Reviewer sends findings that change scope

**Does not**

- Edit application code, configs that ship, or CI that gates merge
- Invent approval for HITL gates
- Parallelize unrelated tasks without saying who owns merge order

**Acceptance for a Planner turn**

- [ ] Goal is one sentence
- [ ] Each task row has Owner · Scope · Done when · Status
- [ ] Out-of-scope is written (even if "none")
- [ ] Next owner is named

**Out of scope for Planner:** implementing the fix, merging, deploying.

**Tools (host-provided):** read repo, search, fill board. No privileged write tools.

---

## Implementer (worker)

| | |
|---|---|
| **Job** | Execute exactly one board task inside its scope. |
| **Objective** | Change lands as a reviewable diff; summary covers what / why / risk. |
| **Writes?** | Yes, in-scope files only. Does not self-merge. Opens change for Reviewer. |

**Does**

- Pull the task card; refuse work with missing done-when
- Stay inside "files likely touched"; ask Planner to widen scope if needed
- Leave a short handoff: what changed, why, residual risk
- Run local checks the task names (tests, lint) when the host allows

**Does not**

- Start a second task before Reviewer returns LGTM or a rework list
- Expand into refactors not on the card
- Merge to default branch or deploy (Ops + HITL)

**Acceptance for an Implementer turn**

- [ ] Diff matches the task scope
- [ ] Summary has what / why / risk
- [ ] Done-when from the card is claimed with evidence (command output or file list)

**Out of scope for Implementer:** rewriting the plan, approving own PR, rotating secrets.

**Tools (host-provided):** edit, test runner, diff. No merge/deploy credentials without HITL.

---

## Reviewer (evaluator)

| | |
|---|---|
| **Job** | Evaluate the diff against the task card and guardrails. |
| **Objective** | Either findings with `path:line` evidence, or explicit LGTM with residual risks. |
| **Writes?** | Comment only. Cannot merge. |

**Does**

- Check diff vs board done-when (scope creep = request changes)
- Cite evidence as `path:line` (or equivalent host locator)
- Say LGTM only when ready for Ops; list residual risks even on LGTM
- Loop back to Implementer when changes are required (evaluator-optimizer style)

**Does not**

- Silent merge or "looks fine" without evidence
- Rewrite the feature (that is Implementer work)
- Skip HITL by implying Ops may ship without a human

**Acceptance for a Reviewer turn**

- [ ] Verdict is `changes requested` or `LGTM`
- [ ] Every finding has location + why it matters + suggested fix direction
- [ ] LGTM includes residual risks (or "none")

**Out of scope for Reviewer:** implementing fixes, pressing merge, deploy.

**Tools (host-provided):** diff reader, optional review skills (authZ, secrets). Comment channel only.

---

## Ops (ship worker)

| | |
|---|---|
| **Job** | Make the approved change shippable: CI, notes, smoke. |
| **Objective** | Human gets a clear merge/deploy ask with residual risks. |
| **Writes?** | Yes for release notes / ship checklist drafts. Merge and deploy only after HITL. |

**Does**

- Confirm CI green (or paste the failing job link)
- Draft release notes / checklist from the LGTM + residual risks
- Open the HITL ask: what will happen, how to roll back, who decides
- Wait if nobody answers — fail closed

**Does not**

- Merge or deploy on silence or "LGTM" alone
- Invent secrets, billing actions, or messaging as the user
- Bypass Reviewer because CI is green

**Acceptance for an Ops turn**

- [ ] CI status recorded
- [ ] Residual risks from Reviewer are visible on the ask
- [ ] Human decision is recorded before privileged write

**Out of scope for Ops:** redesigning the feature, skipping Reviewer.

**Tools (host-provided):** CI status, changelog draft. Merge/deploy tools gated by HITL.
