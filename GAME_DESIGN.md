# DELTA-V — Game Design Bible

**Status:** APPROVED CONCEPT DIRECTION, not implemented.
**Version:** Concept v0.2, approved 2026-11-23.

## Pitch
A minimalist, 2D physics-inspired orbital roguelite: one spacecraft, limited manoeuvre capability, an uncertain universe, and the goal of reaching the greatest distance from the home star. Short, replayable expeditions; meditative most of the time, occasionally tense.

## Design pillars
- Tactile orbital manoeuvres are the central skill.
- Gravity, momentum and SOI transitions behave consistently and intuitively.
- Constant tradeoffs between range, resources and risk.
- Uncertainty comes from limited information and encounters, not arbitrary violations of physics.
- Simplicity above feature count. Do not make a miniature KSP.
- FTL-like consequential encounters and run variety without copying combat, crew or chase mechanics.

## Main interaction
Observe spacecraft motion → hold spacecraft to pause → drag to shape a manoeuvre → inspect responsive predicted trajectory and delta-v cost → release to execute. Provide a cancel gesture and optional precision adjustment. Initially support prograde and retrograde; radial control is optional future exploration. The trajectory preview should be trustworthy under the same physics assumptions as execution. Solid near-term paths, dashed uncertain distant extensions, and subtle confidence cues are possible UI conventions.

## Physics
2D coplanar planetary system, simplified patched-conic two-body orbital motion, instantaneous/impulsive burns initially. Planet/star reference frames change across SOI boundaries without discontinuous jumps in position or velocity. SOI is an approximation and visual/reference-frame transition, not a gravity wall. Gravity bends unpowered trajectories. A moving planet can exchange heliocentric orbital energy through a flyby; an unpowered ideal flyby does not generate propellant delta-v. Unbound approaches require propulsion, atmospheric drag or another dissipative mechanism to capture. Use accurate local physics with approachable presentation, not hidden random trajectory manipulation.

## Phases
1. **Launch:** Brief, largely automatic, with simple engine/Isp/thrust/fuel/mass modifiers determining starting condition and remaining delta-v. No manual launch piloting initially.
2. **Orbit:** Observe and manoeuvre; limited orbital salvage/repair/upgrades; optionally lower orbit toward a landing or raise it to escape.
3. **Interplanetary:** Camera zooms out, uneventful travel accelerates, player can perform course corrections, limited events or resource opportunities occur.
4. **Planetary encounter:** Incoming trajectory and local gravity determine unbound flyby/gravity assist, braking into capture, descent/landing, collision, or escape. These are physical outcomes, NOT option-box selections.

## Resource economy
Keep initially to remaining delta-v (derived from propellant/propulsion), materials, and integrity. Propellant recovery may replenish delta-v subject to tank capacity and mass; gravity assists change trajectory/energy, not fuel. Finite encounter rewards prevent infinite farming. Example future upgrades: efficient engine, fuel capacity, reinforced hull, navigation computer, collector, landing system, thermal protection. All upgrade specifics and balance values remain to be playtested.

## Risk and progression
Routes and encounters should present meaningful choices; short spatial events may include derelicts, asteroid resources, storms, unknown signals and navigation corrections. Planetary orbit can allow resources and landing, while flybys preserve fuel and change route. Runs end on destruction, stranding, or demonstrably unrecoverable progress, not merely zero fuel (a coasting craft may still fly by a planet). Primary record: maximum distance from home star; secondary records may include encounters, assists, captures, discoveries and efficiency. Procedurally varied physically coherent systems are a later milestone, not prototype scope.

## First prototype — planned, NOT AUTHORIZED
One star, one planet, one moon, one spacecraft; visible orbit, hold-to-pause, drag prograde/retrograde, cost and predicted path, release to burn, SOI transitions, camera and time acceleration, escape/flyby/capture, reset. Exclude construction, procedural generation, progression, resource events and landing. Prototype must first establish that manipulating an orbit is fun and comprehensible.

## Open design and validation
Exact control geometry, burn execution UX, manoeuvre preview range, SOI handling near boundaries, camera scales, speed/time-warp rules, navigation uncertainty, failure detection, scoring balance, and engine choice require experimentation. Treat proposed specifics as proposals until validated.
