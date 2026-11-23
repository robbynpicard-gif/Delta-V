# DELTA-V — Current state
**Date:** 2026-11-23
**Branch:** `prototype/orbital-manoeuvres-v0.1`
**Stage:** Prototype 0.6 committed; browser testing required.
**Preview:** https://robbynpicard-gif.github.io/Delta-V/ (deployment and 0.6 rendering not independently verified).
**Main branch:** Not merged.

## Implemented (0.6)
Single-file browser prototype. One future manoeuvre node along own current orbit; node timing and prograde/retrograde controls; projected post-burn trajectory with sparse travel ticks; commit, automatic coast and burn at selected time; delta-v spent at execution; uncommitted expiry; cancel; pause, faster coast, reset, optional synthesized audio; two moving moon proximity discoveries. Planet-only inverse-square gravity with velocity-Verlet stepping.

## Removed from active baseline
Old hold-ship-to-burn-now interaction, debris collection, target selection, candidate-burn search, automated burn recommendation, closest-pass ghosts, fixed-time moon marker, Advance to approach. Historical commits and documents remain in Git history.

## Not implemented
Moon gravity, SOI, gravity assists, capture, landing, genuine interplanetary exploration, future moon trajectories, target solver, procedural systems, interstellar model, progression, saves.

## Verification and risks
GitHub commits confirmed. **No browser-based end-to-end or physics tests have been run.** Check node placement/dragging, slider usability, mobile UI, one-orbit expiry, exact execution timing, affordability, preview/execution agreement, performance of redraws, and whether no-target-aid navigation is too opaque.

## Next
Owner playtests 0.6 and reports what is intuitive or frustrating. Address observed issues before adding physics complexity.

## 0.6.1 — One-pass timing correction (2026-11-23)
**Implemented, not browser verified:** node placement no longer auto-pauses, commit no longer auto-accelerates, and a 0.25×–8× speed slider controls time. The ship itself is not clickable for manoeuvres. Drag node only for timing; burn is set with the signed slider. A missed uncommitted node expires; a committed node fires on its first passage. The only future ghost is the player's proposed post-burn trajectory, not a moon target. Reported old ship-slingshot behaviour is absent from current branch source and may reflect stale Pages deployment or cached browser content; live version has not been checked.

## 0.7 encounter playground — experimental, code committed (2026-11-23)
Two orbiting moons now exert localized gravity inside smooth influence zones (approximate SOI, not strict patched-conic gravity). Spacecraft trajectory and encounter forecast propagate the moons forward in time. Forecast marks the closest predicted approach on the proposed post-burn trajectory with separation and time-to-encounter; moon SOI rings and active influence label are displayed. One-node deadline, prograde/retrograde, budget and discovery retained. **Not browser or physics verified.** In particular test preview agreement near SOI edges, moon encounter prediction stability, performance, and whether SOI changes are intuitive. No automated solver, fuel replenishment, guaranteed capture or separate gravity-assist button.

## Owner-approved design direction, pending Claude physics refinement (2026-11-23)
Owner positively playtested node preview and encounter highlights, but reported anomalous motion after a moon approach and attempted capture burn. Root cause **not yet reproduced or confirmed**. Approved direction: deterministic gameplay-tuned orbital mechanics; one-node commit-or-pass loop; distinct flyby/capture/escape consequences; discovery without mandatory capture; small handcrafted opportunity chains. Freeze feature expansion until physics and forecast/execution agreement are verified. This approval changes design priorities **only**, not implementation or verification status. The current 0.7 SOI implementation remains experimental and may be replaced.
## 0.7 physics audit and patched-conic correction — Claude Code (2026-11-23)
Branch `fix/0.7-patched-conic-physics` → PR into `prototype/orbital-manoeuvres-v0.1` (not main).
**Verified by automated headless-Chrome tests of the real page code** (seeded randomness, manually clocked game loop). No human playtest; mobile only emulated.

**Diagnosed causes of the "strange orbital interaction" (on the 0.7 code before this change):**
1. **No moon collision.** A softened gravity core let the craft fly through moons. In one reproduced capture attempt it passed within 4 units of the centre of an 11-unit moon more than 400 times while looping chaotically, then escaped.
2. **Faded SOI gravity made real capture impossible.** The fade weakened gravity inside the SOI, so the inner moon's well was about half the depth of a real one (escape speed at 20 units: 5.2 instead of 10.7). No prograde inner-moon orbit at any radius survived 800 time units, and the 49-unit ring exceeded the moon's real gravitational reach (Hill radius ≈ 38).
3. **Burns used the planet's frame.** Inside a moon SOI, a "retrograde" capture burn pointed about 42° away from moon-relative retrograde, so a −12 burn cut moon-relative speed by only 6.
4. **Integration timing error.** Moons moved after both gravity half-steps, so post-flyby positions drifted from a high-accuracy reference by 2–11 units live and 4–35 units in the preview.
5. **Labels used the planet's frame.** Inside a moon SOI the HUD said ESCAPE or ECCENTRIC.

**Implemented:** patched-conic gravity (one dominant body; the SOI is the Laplace radius r·(μ/M)^0.4, giving inner ≈ 40 and outer ≈ 61); moons advanced inside the integrator step; moon impacts end the run; prograde/retrograde measured relative to the dominant body (shown in the node panel); orbit labels relative to the dominant body (`INNER MOON ORBIT`, `FLYBY`, `IMPACT COURSE`); forecast outcomes `CAPTURE · … ORBIT · PERIAPSIS n`, `IMPACT · body · T+n`, `LEAVES … T+n` plus the forecast `HORIZON`; moon-relative drawing while inside a moon SOI; committed nodes drawn warm and `LOCKED`; discovery halo hidden after discovery.

**Verified after the change:** zero JS errors on desktop and emulated phone. Forecast closest approach matches live within 0.03 units and 0.03 time; live matches a 20× finer reference within 0.6; preview matches live within 1.1 (was 4–35). Moon orbits at every tested radius and direction hold for 800 time units. End-to-end through the real UI: flyby → in-SOI node → the slider forecast reads LEAVES up to −9, CAPTURE at −10 and −11, IMPACT from −12 → the committed −10 burn held a 19.5–23.6 moon orbit for 400 time units; a forecast impact did impact. Node placement, drag, one-pass expiry, committed execution, affordability lock and discovery still work. Draw cost with an active node is 2.6 ms median.

**Still open:** forecasts are genuinely sensitive for multi-revolution or near-impact encounters (the marker can jump with a 0.2 slider change; live play matches it). The mobile node panel covers the play area. There is no camera or zoom, so moon orbits are small on screen. Moon SOIs can briefly overlap at conjunction (the inner moon takes priority).
