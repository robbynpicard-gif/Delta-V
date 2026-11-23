# DELTA-V — Game Design Baseline 0.6
**Status:** Approved experimental direction, 2026-11-23. Game feel and implementation not yet verified.

## Vision
A peaceful, minimalist orbital exploration puzzle roguelite. The player is a clever traveller who learns to exploit gravity and timing to discover a vast, unfamiliar universe. **Go farther with less.** Orbital understanding is the player's growing skill; exploration is the reward.

## Core loop
**Observe → Place → Experiment → Commit → Travel → Discover.**
- The player sees their own current orbital path and nearby celestial bodies, but receives no automatically computed intercept solution.
- Place **one** future manoeuvre node on the upcoming orbital path. Node represents an execution **time**, not a permanent point in space.
- While planning, pause time; adjust node timing along the upcoming path and apply signed prograde/retrograde delta-v. Show a single projected post-burn spacecraft trajectory and restrained travel-time ticks.
- Commit to coast to the node and automatically execute the planned burn, spending delta-v **at execution**, not planning. Allow uncommitted nodes to expire when passed; do not silently renew on the next revolution.
- A player can cancel an uncommitted node. No reflex countdown or quick-time input.
- After executing, the spacecraft follows the same gravitational physics as its preview. Discover moons by entering their vicinity. Then repeat.

## Deliberate knowledge boundary
Show: own orbit, spacecraft, selected burn node, post-burn spacecraft path, a few own-path time ticks, current moon positions, delta-v and discovery. **Do not show** moon future paths, suggested burn, best intercept, changing future target ghost, automated closest approach. If players cannot learn phase timing, test a manual synchronized time scrub as a later explicit addition, not a solver.

## One-orbit rule
A node must be committed before the craft reaches it. Planning pauses time. If passed uncommitted while coasting, it expires. A committed node executes automatically on arrival. Bound orbits use an upcoming revolution; escape trajectories allow a node within a bounded visible future horizon. Do not require a button press at execution.

## Physical model and limits
Prototype: 2D inverse-square planet gravity, instantaneous prograde/retrograde burn, moving moons in circular planet orbits, broad vicinity discoveries, finite delta-v. No moon gravity/SOI, gravitational assists, capture, landing, full procedural universe, galaxy simulation, upgrades or economy beyond delta-v. All units are game units; physical consistency within this model matters more than false precision.

## Experience and scope
Simple controls, meditative coasting, consequential choices, forgiving retry. Avoid a miniature KSP, automated optimal targeting, arbitrary physics, forced reflex tests, or endless passive waiting. The intended long-term hierarchy is planetary neighbourhoods → stellar systems → galactic context, with interstellar travel mechanics unresolved.

## Validation
Can a new player place a node, understand when it fires, predict the shape of the resulting orbit, commit, and feel agency when discovering a moon? Does the lack of future moon markers create satisfying discovery or opaque guesswork? Is the one-orbit deadline motivating or annoying? Browser playtest before adding SOIs or other systems.

## 0.6.1 timing experiment — supersedes automatic planning pause
**Experimental:** Planning does not automatically pause time; the player can voluntarily pause or slow time with a 0.25×–8× speed slider. An uncommitted node is a one-pass opportunity and expires on arrival. Commit does not force time acceleration. This intentionally tests whether the distance/time to the node creates meaningful stakes without reflex pressure. Previous default auto-pause and auto-fast-forward are superseded. The player can still pause manually; whether that dilutes the intended tension is an open playtest question.
