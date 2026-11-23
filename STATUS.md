# DELTA-V — Current state

**Date:** 2026-11-23
**Stage:** Preproduction
**Repository:** robbynpicard-gif/Delta-V
**Implementation authorization:** NO
**Gameplay code:** None confirmed
**Playable build:** None confirmed
**Tests:** Not run
**Steam release:** Long-term aspiration, no committed plan/date

## Approved
Core orbital roguelite design, tactile manoeuvre interaction, intuitive gravity/SOI, minimalist atmospheric-vector visuals, peaceful meditative Mini Metro-inspired audio with occasional tension.

## Next authorized work
Discuss art and sound design details; maintain documentation and decisions. Ask for explicit permission before starting any gameplay implementation.

## Collaboration notes
GitHub files are the shared source of truth. Claude and ChatGPT must read AGENTS.md and current docs before editing; conversations are not automatically synchronized.

## Prototype 0.1 branch update (2026-11-23)
Owner explicitly authorized a small playable manoeuvre experiment. `prototype/orbital-manoeuvres-v0.1` contains `index.html` and `PROTOTYPE.md`. **Implemented but not browser-verified.** This limited authorization does not approve full expedition implementation or merging into main. See PROTOTYPE.md for scope, controls and limitations.

## Prototype 0.1 audit — Claude Code (2026-11-23)
**Browser-verified (automated):** Headless Chrome 1280×800 and an emulated 390×844 touch phone, driven by Playwright with real pointer and touch events. There was no hands-on human playtest, so "feel" findings are inferred, not experienced.
- **Verified working:** load with zero JS errors; hold pauses the simulation; prograde and retrograde preview and execution; delta-v accounting; release-to-burn; Escape cancel; pause/resume via button and Space; reset; sound toggle (cues fire only when on); impact detection and end state; touch input.
- **Prediction accuracy verified:** across burns from −22 to +12 m/s, the executed path stays within ≤1.7 world units of the preview (≈2–3 px), impact predictions agree, and there is no energy drift over 20 orbits.
- **Fixed on `fix/manoeuvre-cancel-and-status`:** (1) The documented "drag back to zero to cancel" needed a return within ~2 px, so it was nearly impossible, especially on touch. A 10 px screen-space dead zone now cancels, with a "RELEASE TO CANCEL" label. (2) Status text no longer sticks on PLANNING / BURN / CANCELLED. It returns to COASTING after a short delay and never overwrites IMPACT.
- **Open, needs owner decision:** no camera, so prograde burns of more than ~2–3 m/s leave the orbit partly off-screen (a +5 burn left the craft off-screen 61% of the time); escape has no end state; mobile drag sensitivity is about 2× desktop; the thumb covers the burn label on touch. See PROTOTYPE.md.
- **Doc inconsistency:** AGENTS.md, README.md, ROADMAP.md and DECISIONS.md still say the prototype is NOT AUTHORIZED. Left for the owner to reconcile.
