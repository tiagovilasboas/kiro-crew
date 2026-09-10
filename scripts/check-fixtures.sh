#!/bin/sh
# Prove both sides of the fixture: fixed must pass, broken must fail.
set -eu

root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
cd "$root"

status=0

if node scripts/validate-handoff.js examples/handoff.fixed.json; then
  echo "fixed fixture: pass (expected)"
else
  echo "fixed fixture: failed (unexpected)"
  status=1
fi

if node scripts/validate-handoff.js examples/handoff.broken.json; then
  echo "broken fixture: pass (unexpected; privileged write without hitl must be rejected)"
  status=1
else
  echo "broken fixture: reject (expected)"
fi

exit "$status"
