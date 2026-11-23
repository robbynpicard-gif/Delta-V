# DELTA-V — Current state
**Date:** 2026-11-23
**Branch:** `prototype/orbital-manoeuvres-v0.1`
**Stage:** Prototype 0.6 committed; browser testing required.
**Preview:** https://robbynpicard-gif.github.io/Delta-V/ (deployment and 0.6 rendering not independently verified).
**Main branch:** Not merged.

## Implemented (0.6)
Single-file browser prototype. One future manoeuvre node along own current orbit; node timing and prograde/retrograde controls; projected post-burn trajectory with sparse travel ticks; commit, automatic coast and burn at selected time; delta-v spent at execution; uncommitted expiry; cancel; pause, faster coast, reset, optional synthesized audio; two moving moon proximity discoveries. Planet-only inverse-square gravity with velocity-Verlet stepping.

## Removed from active baseline
Old hold-ship-to-burn-now interaction, debris collection, target selection, candidate-burn search, automated burn recommendation, closest-pass ghosts, fixed-time moon marker, Advance to approach. Historical commits and documents remain in Git history.

## Not implemented
Moon gravity, SOI, gravity assists, capture, landing, genuine interplanetary exploration, future moon trajectories, target solver, procedural systems, interstellar model, progression, saves.

## Verification and risks
GitHub commits confirmed. **No browser-based end-to-end or physics tests have been run.** Check node placement/dragging, slider usability, mobile UI, one-orbit expiry, exact execution timing, affordability, preview/execution agreement, performance of redraws, and whether no-target-aid navigation is too opaque.

## Next
Owner playtests 0.6 and reports what is intuitive or frustrating. Address observed issues before adding physics complexity.

## 0.6.1 — One-pass timing correction (2026-11-23)
**Implemented, not browser verified:** node placement no longer auto-pauses, commit no longer auto-accelerates, and a 0.25×–8× speed slider controls time. The ship itself is not clickable for manoeuvres. Drag node only for timing; burn is set with the signed slider. A missed uncommitted node expires; a committed node fires on its first passage. The only future ghost is the player's proposed post-burn trajectory, not a moon target. Reported old ship-slingshot behaviour is absent from current branch source and may reflect stale Pages deployment or cached browser content; live version has not been checked.
