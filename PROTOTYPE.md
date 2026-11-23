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
