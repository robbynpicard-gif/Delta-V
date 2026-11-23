# Orbital manoeuvre prototype 0.1

**Status:** Implemented. Automated browser verification passed on 2026-11-23 (Claude Code; see "Audit results" below). Not yet playtested by a human.

## Run
Open `index.html` in a modern desktop or mobile browser. No installation, dependencies, build or server required. GitHub private repositories may not provide a public Pages preview; download the file or clone the branch to play locally.

## Controls
- Hold/touch the white spacecraft to pause simulation.
- Drag **along its flight direction** to plan a prograde burn, or opposite for retrograde. The trajectory preview and delta-v cost update while dragging.
- Release to burn. Drag back within ~10 px of where you grabbed (the label shows RELEASE TO CANCEL) or press Escape to cancel; pointer cancellation also cancels.
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
- Trajectory prediction integrates a fixed horizon and is clipped for long escapes.
- No camera zoom, orbital insertion from elsewhere, SOI or gravity assists yet.
- Sound is a small experimental palette, not a finished generative soundtrack.
- Pointer input must begin near the spacecraft; on small screens the craft may be difficult to grab.

## Audit results — Claude Code, 2026-11-23
Method: headless Chrome (desktop 1280×800; emulated 390×844 touch phone) driven by Playwright with real pointer and touch events, using a test-only copy that exposes internal state. The physics functions were also copied into Node to compare preview and execution numerically. No human hands-on playtest has been done yet.

### Verified working
Load with zero JS errors on both viewports · hold pauses time · prograde (teal) and retrograde (amber) previews update live · release burns and deducts delta-v · Escape and pointercancel cancel · Pause button, Space and Reset work · burning while paused works · sound is silent when off and plays a grab cue plus a two-note release cue when on · max retrograde impacts in ~3.8 s and shows SIGNAL LOST · touch hold/drag/release works.

**Prediction vs execution:** the preview uses dt 0.075 and execution uses dt 0.028, but the difference is negligible. The maximum path deviation is 1.7 world units (≈2–3 px) for burns from −22 to +12, in-browser deviation measured 0.11, impact predictions match, and there is no apsis drift over 20 orbits. **The preview can be trusted.**

### Bugs (fixed on `fix/manoeuvre-cancel-and-status`)
| Sev | Bug | Repro | Fix |
|---|---|---|---|
| High | Drag-back cancel was effectively impossible. Release had to be within ~2 px (desktop) or ~1.3 px (phone) of the grab point, so ending 3 px away burned fuel. | Grab, drag out, return to the start, release → burns 0.27 m/s. | 10 px screen-space dead zone plus a RELEASE TO CANCEL label. |
| Low | Status line stuck: PLANNING MANOEUVRE after a zero-length release; BURN and CANCELLED persisted indefinitely; Resume showed a bare COASTING. | Tap the craft without dragging, or burn and wait. | Transient messages return to COASTING · PLANETARY ORBIT after 1.5–1.8 s; IMPACT is never overwritten. |

Side effect of the dead zone: the same drag now gives slightly less delta-v (a 60 px desktop drag gives 4.46 instead of 5.35 m/s).

### Interaction and usability issues (NOT fixed; owner decision needed)
1. **High — the orbit leaves the screen.** There is no camera. The desktop view shows about r ≤ 270, so any prograde burn above ~2.5 m/s puts apoapsis off-screen. After a +5 burn the craft was off-screen 61% of the time, and you can't see the result of the most common manoeuvre. Camera is already in the planned first-milestone scope (GAME_DESIGN.md).
2. **High — the preview horizon is fixed at 116 time units.** That covers 2.4 circular orbits but only 0.94 of a +5 orbit and 0.07 of a +9 orbit, so a large bound orbit and an escape look identical. Suggestion: predict one full period (Kepler) and label ESCAPE explicitly.
3. **Medium — escape has no outcome.** The craft flies off forever, the status keeps the old message and there is no end or "escaped" state, so you have to find Reset yourself. Escape takes only ~9.8 of the 32 m/s budget.
4. **Medium — mobile sensitivity is inverted.** Sensitivity is scaled to world units, so the phone (scale 0.71) gives about 2.2× the delta-v per pixel of desktop (scale 1.57). A 50 px thumb drag gives 7.9–8.9 m/s, almost an escape. Fine control on a phone is hard. Suggestion: map sensitivity in screen pixels, possibly with a non-linear (quadratic) curve for fine small burns.
5. **Medium — the thumb hides the feedback on touch.** The burn label sits 22–38 px above the craft and the craft itself is small, so a finger covers both.
6. **Low — mobile layout.** The orbit uses about 65% of the width and the stats wrap onto three lines.
7. **Low — the preview dash is lost on closed orbits.** About 2.4 overlapping laps fill in the gaps, so retrograde previews look solid.
8. **Low — the "orbit" chime is time-based** (every 48 units = the starting period) rather than tied to periapsis, so it drifts out of meaning after any burn.
9. **Low — no audio feedback while dragging.** The proposed responsive pitch (CREATIVE_DIRECTION) is not implemented. A tap without dragging now briefly reads MANOEUVRE CANCELLED.
