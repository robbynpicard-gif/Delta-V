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
