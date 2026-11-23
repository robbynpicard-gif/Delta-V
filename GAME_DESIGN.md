# DELTA-V — Approved concept: A Universe Discovered One Orbit at a Time
**Status:** Approved direction (2026-11-23). Prototype implementations are experiments, not validated gameplay.

## Player fantasy
Be a clever interstellar traveller exploring an unfamiliar, vast universe. Go farther with less. The player should feel responsible for discoveries achieved by understanding gravity and timing, not following prescribed tutorials.

## Core loop
**Observe → Plan → Commit → Discover → Repeat.** Begin in a coherent, constrained-random orbital neighbourhood; identify nearby orbital opportunities; hold spacecraft to pause, pull a tactile slingshot to preview a prograde/retrograde manoeuvre, release to spend delta-v; coast with player-controlled time warp; reach a new celestial neighbourhood and discover new opportunities. Reward curiosity, economy, and improved understanding. Avoid arcade reflex pressure.

## Pillars
1. Simple, expressive input; trustworthy orbital prediction; readable cause and effect.
2. Exploration is the reward; the environment offers opportunities, not instructions.
3. Delta-v is the **only base consumable resource** in the core loop; don't add integrity/materials/fuel currencies unless a later prototype proves their necessity.
4. Procedural generation must yield physically coherent **interesting orbital relationships**, not merely random bodies; ensure viable early options.
5. Limited local knowledge: nearby bodies charted; distant bodies may be visible but not yet charted; avoid arbitrary fog or scanning chores.
6. Preserve player agency. No autopilot, exact optimal-burn recipes, or forced encounter slowdown by default.
7. One compact visual language: current path, planned path, moving-target encounter at matching future time, cost/affordability, and destination. Show consequences rather than an encounter-quality score.

## Exploration hierarchy
- **Immediate prototype:** spacecraft, one planetary primary, two moving moons, orbital transfer and broad encounter regions. No gravity from moons yet.
- **Next physics milestone if fun:** patched-conic-style SOI/reference-frame transitions, preserving inertial state and predictable preview; meaningful flybys.
- **Long-term world vision:** local planetary neighbourhoods → star systems → galactic context. Context-sensitive units km/AU/parsecs are labels, not mechanics. Do **not** promise a continuous fully simulated galaxy or simply rescale identical gameplay to parsecs. Interstellar travel model unresolved.
- Gravity assists are a potential signature mechanic, but must emerge from moving-body physics and be tested after basic transfers prove satisfying.

## Primary and optional objectives
Primary: reach the vicinity of another celestial body; don't require docking or matching velocities for discovery. Optional later: stable capture, low-relative-speed rendezvous/debris retrieval, efficient routes, gravity assists. Discovery should reveal onward possibilities, not just increment a counter.

## Delta-v and planning
Keep burns finite and consequential. Current experiment allows hypothetical unaffordable burns with an explicit warning and **no surprise partial execution**; compare this against affordability-constrained primary input. No separate single-burn strength limit unless needed for game feel. Delta-v replenishment is **unresolved**; start with a fixed budget and test stranding/soft-lock risks before designing recovery.

## What NOT to build yet
Full galaxies, launch simulation, procedural campaign, upgrades, resource salvage, docking, automatic rendezvous, random encounter menus, extensive HUD, forced tutorial lessons. Avoid making a miniature KSP.

## First Neighbourhood test
Can a player (a) understand how the slingshot changes an orbit, (b) reach a moving moon by planning/coasting, (c) feel curiosity about the next body, and (d) voluntarily retry with less delta-v? Observe confusion, idle waiting, repeated failed encounters, and desire to explore. Do not call this loop validated until browser playtesting.
