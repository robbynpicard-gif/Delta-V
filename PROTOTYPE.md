# DELTA-V Prototype 0.6 — One Orbit, One Decision
**Status:** Implemented on prototype branch, not yet browser verified. Historical prototypes 0.1–0.5A.1 are superseded as the active interaction.

## Run
Open `index.html` in a modern browser or visit the configured GitHub Pages preview once deployed.

## Controls
1. Click or tap the visible upcoming spacecraft orbit to place a node; simulation pauses.
2. Drag node along orbit to change burn time. Drag away from the node to adjust signed prograde/retrograde burn; sliders also allow precise timing and magnitude.
3. Cyan dashed line is the projected **spacecraft** path after the planned burn. Small ticks indicate elapsed travel along it; moons shown are at **current** positions, not predicted intercepts.
4. **Commit** coasts toward the node and burns automatically at the scheduled time; delta-v is charged then. **Remove node** cancels an uncommitted plan.
5. **Resume** without committing allows the node to expire on passage. **Coast faster** accelerates time without steering. Reset starts a fresh nearby moon configuration.
6. Keyboard: Space pause/resume, R reset, Escape remove uncommitted node.

## Known limits
Only planet gravity; moons orbit but do not exert gravity. Encounter = enter broad proximity halo, not capture. No solver or future moon marker. Only one node at a time, one upcoming orbital revolution (bounded horizon for escapes). No browser verification yet.

## Playtest
Is the node discoverable? Is dragging clear? Does execution match the preview? Does the lack of target predictions create satisfying orbital intuition or frustrating blind guessing? Is faster coast adequate? Does a moon discovery feel earned?

## 0.6.1 playtest correction
Click the orbital line, **not the ship**, to place a node. Planning **does not pause time**. Use the top-right speed slider (0.25×–8×) or Pause to manage decision time. Drag the node along the orbit to alter its scheduled time; use the prograde/retrograde slider to set burn. Commit before the craft passes the node. Committed burns execute at passage without automatic fast-forward. Uncommitted plans disappear at passage. The dashed cyan curve is the proposed **ship** trajectory, not live targeting. No ship slingshot exists in branch source. Not browser-verified.

## 0.7 — Encounter playground
The moons now have visible influence rings and localized gravitational pull. Place one node on your spacecraft orbit, choose prograde/retrograde, and view the proposed post-burn path and a predicted closest approach (body, separation, time). Committing locks the burn; an uncommitted node expires when passed. The active influence region is shown in the HUD. SOI uses a smooth, deliberately simplified gravity approximation; this is not a validated full celestial mechanics model. Browser and numerical verification remain outstanding.

## 0.7.1 — Patched-conic correction (branch `fix/0.7-patched-conic-physics`, pending owner review)
- **Gravity:** inside a moon's ring only that moon pulls, measured relative to the moon; outside, only the planet. Rings are physically sized SOIs (inner ≈ 40, outer ≈ 61).
- **Capture is real and permanent under this model:** an orbit that stays inside the ring stays forever. You cannot be captured just by coasting in; you must **burn inside the ring**. The forecast says `CAPTURE · <MOON> ORBIT · PERIAPSIS n` when your planned burn achieves it, `LEAVES <MOON> T+n` when it doesn't, and `IMPACT` when it hits.
- **Burn direction** is relative to whichever body you are orbiting at the node ("RELATIVE TO INNER MOON" in the node panel).
- **Moons are solid:** hitting one ends the run.
- While inside a moon's ring, paths are drawn around the moon so a moon orbit looks like an orbit.
- Committed node: warm colour, double ring, `LOCKED`.
- Playtest questions: Is "burn inside the ring to capture" discoverable? Is the capture window (≈ −10 to −11 for a 20-unit pass) too narrow? Is the burn-frame switch at the ring edge understandable?
