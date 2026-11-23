# Orbital manoeuvre prototype 0.1

**Status:** Implemented on prototype branch; NOT YET PLAYTESTED OR VERIFIED IN A BROWSER.

## Run
Open `index.html` in a modern desktop or mobile browser. No installation, dependencies, build or server required. GitHub private repositories may not provide a public Pages preview; download the file or clone the branch to play locally.

## Controls
- Hold/touch the white spacecraft to pause simulation.
- Drag **along its flight direction** to plan a prograde burn, or opposite for retrograde. The trajectory preview and delta-v cost update while dragging.
- Release to burn. Drag back near zero or press Escape to cancel; pointer cancellation cancels.
- Pause/Resume, Reset, Sound on/off. Keyboard: Space toggles pause (outside buttons), R resets.
- The sound toggle defaults off due to browser autoplay restrictions; click Sound on to hear original synthesized cues.

## What is deliberately absent
No launch, upgrades, SOI transitions, interplanetary travel, procedural systems or save state. This is an isolated planet manoeuvre toy, not the full planned first milestone. The physics use 2D inverse-square gravity and a velocity-Verlet integrator with instantaneous prograde/retrograde burns. Units are illustrative, not a real planetary scale.

## Playtest questions
1. Can you discover the hold/drag/release interaction immediately?
2. Does the preview clearly communicate the consequence before you commit?
3. Are prograde/retrograde directions intuitive?
4. Is the drag sensitivity too weak or too strong?
5. Does a burn feel satisfying without excessive audio or effects?
6. Does it feel meditative between decisions?

## Known limitations
- No automated browser test has been performed; behaviour requires hands-on validation.
- Trajectory prediction integrates a fixed horizon and is clipped for long escapes.
- No camera zoom, orbital insertion from elsewhere, SOI or gravity assists yet.
- Sound is a small experimental palette, not a finished generative soundtrack.
- Pointer input must begin near the spacecraft; on small screens the craft may be difficult to grab.

## Prototype 0.2 experiment — 2026-11-23
**Implemented on the prototype branch; not yet browser-verified.** Owner playtested 0.1 and requested faster movement, more tactile burns and small collectible orbital debris.

- Simulation coasting speed raised from 2.2x to 3.8x, without changing the gravity model or fixed integrator step.
- Slingshot input: hold craft to pause, **pull backward against travel for prograde** (positive Δv), push forward for retrograde. Burn magnitude scales with tangent-aligned pull; off-axis movement does not contribute.
- While winding, a tether follows the pointer, a thrust vector shows the eventual burn, and the existing predicted trajectory updates.
- Six pieces of debris follow independent circular gravitational orbits around the planet. Contact within 11 world units collects one, plays a restrained tone (if enabled), and adds a small particle flourish and counter.
- No resources, upgrades or meta progression. Reset restores the six pieces.
- **Needs hands-on testing:** verify burn direction, trajectory preview agreement, debris interception, feel of speed and pull sensitivity, mobile grabbing and high-frame-rate stability.

## Prototype 0.3 — gentle rendezvous guidance
**Implemented on prototype branch, awaiting browser playtest.** Player approved gentle guidance (not autopilot).

- Time warp slider: 0.5×, 1×, 2×, 4×, 8×, 16×, default 4×. Hold-to-plan still pauses. Integrator retains fixed timestep; simulation has a per-frame step cap to prevent runaway work.
- Select an orbiting debris object by clicking/tapping it. Target highlights.
- Predicted rendezvous evaluates **both moving objects over the same future timeline**, sampling candidate signed tangential burns and reporting a promising pull direction/magnitude, closest pass distance, relative speed, and time to approach.
- During slingshot drag, target information evaluates the **player's proposed burn**, while the suggested burn remains advisory.
- Collection now requires passing within 11 simulation units at relative speed under 9 units/s. Misses and high-speed flybys do not collect.
- Guidance uses a coarse burn search, 100 simulation-second prediction horizon, and is **approximate**. It does not guarantee collection and does not perform automatic burns.
- Test particularly on slow mobile devices at 16×, on target selection during a fast coast, and on debris encounter accuracy. UI values are illustrative game units, not real SI distances.
