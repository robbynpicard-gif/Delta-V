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

## 0.7 experimental scope — Encounter playground
Owner requested a small, simple system of visitable bodies with their own SOIs. Prototype uses one central planet and two orbiting moons with smooth localized gravitational influence, allowing flyby deflections in principle. Balanced encounter forecast displays closest approach, time, and location for the player's proposed burn, not an optimized manoeuvre. The simplified SOI is an approximation and capture/assist are not yet verified. Preserve one-pass commitment pressure and finite delta-v. Do not broaden the system until playtested.

## Approved design revision — gameplay-first orbital decisions (2026-11-23)
**Current guiding principle:** DELTA-V is an orbital exploration game about consequential, learnable manoeuvre decisions, not a gravity simulator. Predictability and consistency outrank gravitational realism. Retain simple prograde/retrograde burns, one upcoming node, a commitment deadline, finite delta-v and no automated solver.

**Revised loop:** Observe → Plan → **Commit or Pass** → Travel → Encounter → Reassess. Passing an opportunity preserves fuel but forgoes that node. Every encounter should meaningfully alter future navigation possibilities rather than simply grant a reward.

**Encounter vocabulary:** Flyby (continue on changed path), capture (establish a bound local orbit), escape (trade stability for reach). All should follow consistent gameplay physics and the same manoeuvre inputs. Discovery requires reaching vicinity, **not** capture. Accurate forecast labels should only appear when verified by the actual model; explicitly distinguish finite prediction horizon from permanent stability.

**Level-design principle:** Small, initially handcrafted orbital neighbourhoods with distinct navigational geography and opportunity chains. Simple early transfers should work without advanced gravity-assist mastery. A body is interesting because of routes it enables, not arbitrary bonuses.

**Physics direction:** Exact gravity implementation remains **Experimental**. Compare deterministic simplified dominant-body SOI and gameplay-tuned orbital models; do not preserve the existing blended-gravity approximation merely for realism. Reproduce and resolve the reported post-capture orbital anomaly, test prediction/execution agreement and classify capture correctly before expanding scope.

**Deferred/retired from near-term work:** launch minigame, materials, integrity, debris/salvage economy, upgrades, landing systems, large procedural universe and interstellar transition mechanics. These are not active dependencies of the simple loop. Earlier sections of this document describe historical prototype assumptions where they conflict with this revision.

## Approved refinement — dynamic SOI capture and accessible visual language (2026-11-23)
**Capture:** A moon SOI should become a genuine orbital neighbourhood. A sufficiently effective retrograde manoeuvre **relative to the moon's velocity**, executed inside its SOI, should be capable of establishing a bound local orbit when the trajectory and available delta-v allow. Preserve continuous movement and consistent rules through SOI entry/exit. After capture the player may remain in moon orbit, plan another node around it, or depart. SOI entry alone is not capture; a retrograde burn is not an automatic capture guarantee. A single dominant-body model is a candidate, not an already approved physics implementation. Forecast, orbital classification and burn frame must refer to the same active body and use the same simulation rules.

**Legend:** Make orbit visuals legible without prior orbital knowledge. Provide a small, accessible, collapsible legend with line/marker swatches and plain-language explanations for current orbit, projected orbit, manoeuvre node, burn direction vector, encounter marker, SOI boundary, discovery boundary, spacecraft, trail, sample/time markers, visited state and active gravitational reference. Differentiate meaning by shape/line style and text, not colour alone. Audit actual render code and keep labels faithful; current forecast dots are sampled by index rather than equal elapsed time. Avoid permanent HUD clutter or adding a tutorial system.
