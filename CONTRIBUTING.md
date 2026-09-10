# Contributing

This repository is the **Kiro host adapter**. Contributing language for this file, issue forms, and pull requests is **English**. Commands and paths stay in English fences.

Generic brain · workers · ops belongs in [jarvis-architecture](https://github.com/tiagovilasboas/jarvis-architecture). Desktop chief-of-staff belongs in [grok-bot-architecture](https://github.com/tiagovilasboas/grok-bot-architecture).

```
docs/paste-into-kiro.md     Kiro paste steps
docs/why-not-jarvis.md      repo choice
pack/steering/              copy into .kiro/steering/
pack/hooks/                 copy into .kiro/hooks/
crew/                       Kiro mapping + board
examples/                   checked handoff envelopes
scripts/                    fixture checker (Node, zero deps)
```

## What belongs here

Kiro-delta only:

- Clearer paste steps for steering, hooks, or specs
- Tighter Kiro constraints (inclusion modes, hook block codes, spec vs board)
- Fixture field changes that stay fail-closed
- Board rows that name a Kiro persist location

A useful change is concrete: one extra constraint, one pack file, one fixture field. Not a new role and not a restated ADR.

## What does not belong here

- Vendor-agnostic layer theory (open a jarvis ADR)
- Desktop CoS / shared-computer work (open a grok-bot PR)
- Client playbooks, secrets, or private process
- A fifth crew seat (Human is the gate, not a role)

## Quality bar

Keep the adapter **small and checkable**.

- Steering files stay short. Always-on steering is for Kiro constraints, not a crew manifesto.
- Hooks use the v1 JSON schema (`.kiro/hooks/*.json`). A `command` action that exits `2` may block `PreToolUse` / `UserPromptSubmit` / `PreTaskExec`. Hooks do not fill `decision` or `decided_by`.
- Custom agents do not auto-load steering. The pack notes the `resources` glob.
- Privileged writes without `"hitl": true` must fail `scripts/validate-handoff.js`.

## How to improve the fixture

Required envelope fields: `task_id`, `next_owner`, `action`, `target`, `hitl`.

Privileged `action` values (`merge`, `deploy`, `secret_use`, `delete`) also need `blast_radius`, `rollback`, and `hitl: true`. `decided_by: auto` is always invalid.

```
# both behaviors must hold
sh scripts/check-fixtures.sh
```

If you change the checker, update both fixtures so CI still proves reject-on-missing-HITL.

## Propose a change

1. Open an issue with the **Improve Kiro adapter** form (`.github/ISSUE_TEMPLATE/improve-crew.yml`).
2. Point at the Kiro-delta gap (paste step, steering/hook constraint, skippable HITL field).
3. Open a pull request that updates the smallest set of files. Use `.github/PULL_REQUEST_TEMPLATE.md`.

```
git checkout -b docs/clarify-kiro-hook-block
```

## Before you open a PR

- [ ] English prose; English commands and paths
- [ ] Change is Kiro-delta (or Stage 0 hygiene)
- [ ] No restated jarvis / grok-bot manifesto
- [ ] HITL stays fail-closed; no implied auto-approve
- [ ] `sh scripts/check-fixtures.sh` exits 0
- [ ] Four roles only (Human is the gate)
- [ ] No client IP; pack files stay Kiro-only
