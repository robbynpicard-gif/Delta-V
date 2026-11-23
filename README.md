# DELTA-V
A minimalist orbital exploration puzzle roguelite about going farther with less.

**Current prototype:** 0.6 — **One Orbit, One Decision**. Experimental and awaiting browser playtest.
**Preview:** https://robbynpicard-gif.github.io/Delta-V/
**Development branch:** `prototype/orbital-manoeuvres-v0.1` (main has not been merged).

## Shared source of truth
Read [AGENTS.md](AGENTS.md), [GAME_DESIGN.md](GAME_DESIGN.md), [CREATIVE_DIRECTION.md](CREATIVE_DIRECTION.md), [DECISIONS.md](DECISIONS.md), [ROADMAP.md](ROADMAP.md), [STATUS.md](STATUS.md), and [PROTOTYPE.md](PROTOTYPE.md) before changing gameplay.

## Current loop
Observe your orbit → place one future manoeuvre node → shape a prograde/retrograde burn → commit → coast and execute → discover. The player is shown their own projected trajectory, not an automated moon intercept. Earlier target-solving prototypes are superseded. GitHub is canonical shared context for Claude and ChatGPT.

## Latest experiment — 0.7
The prototype branch now contains a small central planet and two visitable moons with approximate spheres of influence and a synchronized closest-approach forecast. This is experimental and not independently browser-verified. Earlier 0.6 instructions are historical; see the latest section of PROTOTYPE.md and STATUS.md.

## Current approved gameplay direction (2026-11-23)
Gameplay-first, deterministic orbital exploration: observe → plan → commit or pass → travel → encounter → reassess. The existing 0.7 SOI physics is experimental after a reported capture anomaly. The immediate priority is Claude-led physics/forecast refinement, not feature expansion. See latest sections of DECISIONS.md, GAME_DESIGN.md, ROADMAP.md and STATUS.md for current decisions; earlier summaries are historical when conflicting.

## Approved next refinement — 0.7.2 (2026-11-23)
Navigation & Clarity is approved **for implementation but not yet implemented**: bounded zoom and framing, fine burn controls, body-relative speed information, unobtrusive contextual observations and explicit forecast horizon/reference. See DV-044–DV-050 and the latest ROADMAP.md. Coordinate with the unmerged 0.7.1 patched-conic/Orbit Legend candidate (PR #3) before modifying gameplay; do not assume the deployed preview contains 0.7.2.
