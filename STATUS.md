# DELTA-V — Current state
**Date:** 2026-11-23
**Branch:** `prototype/orbital-manoeuvres-v0.1`
**Stage:** Playable prototype experiment, awaiting browser verification of 0.4.
**Deployment:** GitHub Pages configured by owner to deploy from prototype branch; https://robbynpicard-gif.github.io/Delta-V/ (live 0.4 not verified here).
**Main branch:** Not merged. Earlier preproduction statements in older docs are historical, not the current development gate.

## Approved design
Exploration-first orbital puzzle roguelite; Observe → Plan → Commit → Discover; constrained procedural local neighbourhoods, delta-v sole base resource, moving-body discovery as primary objective. Galaxy-scale universe remains a vision, not an implemented or physically specified system. See GAME_DESIGN.md and DECISIONS.md DV-013 onward.

## Implemented on prototype branch
- 0.1 orbital toy; 0.2 slingshot and debris; 0.3 time warp and time-aware encounter estimate.
- **0.4:** two moving moon targets replace debris, initial configuration varied within narrow constraints, broad proximity discovery, visible encounter preview, delta-v planning/affordability warning and no partial burn execution.
- Existing planet-only gravitational field remains. **Moon gravity, SOI transitions, transfers to a parent star, continuous universe, gravity assists, procedural system generation, and complete exploration progression are NOT implemented.**
- Prediction uses the same planet gravity integration for ship and moon trajectories, with a finite planning horizon; approximations and UX still need playtesting.

## Verification
GitHub commits succeeded. **No live browser or automated physics verification performed** for 0.4. Potential issues: camera scale/visibility of outer moon, encounters occurring beyond prediction horizon, performance at 16×, visual clutter, target selection, reachable openings, and mobile interaction.

## Next
Owner playtests 0.4, reports first-transfer experience. Fix blockers and refine feel before expanding mechanics. Do not treat exploration loop as validated yet.

## Prototype 0.5A — Manoeuvre Planner (2026-11-23)
**Implemented, not browser-verified:** select moon, live future closest-approach preview while dragging, and Advance to approach button. Advance is only offered if a near pass is predicted within a 1200-s simulation horizon; it fast-forwards the same physics and stops 12 simulation seconds before predicted closest approach. It does not change trajectory or guarantee capture. No future-burn-point planning (0.5B), moon gravity, or SOI switching yet. Playtest whether the encounter prediction, stopping distance, performance and advance availability feel useful. No live browser test performed.

## 0.5A.1 — Planner indicator stabilization
**Implemented, not browser-verified:** On target selection / manoeuvre start, choose a single reference encounter time. While dragging, compare ship and target at that fixed timestamp rather than reselecting the global minimum each pointer move. Label the result as fixed-time separation, not closest pass. This fixes the moving-goalpost design flaw but does not guarantee an intercept or validate prediction precision. Advance-to-approach remains a separate nearest-pass calculation. Await player retest.
