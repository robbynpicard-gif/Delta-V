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

## Newly requested refinements — not implemented (2026-11-23)
Owner reports SOI capture feels impossible and trajectories continue to favour the primary body. Source inspection confirms current burnNow() applies signed burn along **planet-frame absolute spacecraft velocity** and orbitPeriod()/orbitalLabel() use central-planet MU and coordinates even inside a moon SOI; moon gravity is a localized faded additive acceleration. This does not prove capture impossible in all initial states, but fails the intended moon-relative planning model. **Approved requirement:** dynamic moon-relative capture, continued local orbit and escape under deterministic forecastable rules; exact physics solution pending Claude testing.

Owner also reports ambiguous, inaccessible orbit symbols. Current renderer includes current path, dashed forecast, manoeuvre node, encounter ring, SOI ring, discovery ring, past trail, small forecast sample dots, craft glyph and visited-colour changes. **Approved requirement, not implemented:** simple collapsible Orbit Legend with matching swatches, accurate descriptions, non-colour cues, keyboard/touch access. Current forecast dots are sample-index markers, not guaranteed time ticks. No browser accessibility or capture validation performed.
## 0.7.1 physics diagnosis — Claude Code (2026-11-23) — candidate on branch, not adopted
Branch `fix/0.7-patched-conic-physics` → PR #3 into `prototype/orbital-manoeuvres-v0.1`. Per DV-037 this is the **dominant-body SOI candidate**, Experimental, pending owner playtest. Verified by automated headless-Chrome tests of the real page code (seeded randomness, manually clocked loop, real mouse/touch for controls). No human playtest; the phone was only emulated.

**Anomaly reproduced. Causes in the original 0.7 code:**
1. **Moons weren't solid.** A softened gravity core let the craft pass through moons; one capture attempt looped through the inner moon more than 400 times, then escaped.
2. **The faded SOI force couldn't hold an orbit.** The inner moon's well was about half the depth of a real one (escape speed 5.2 vs 10.7 at 20 units), no prograde inner-moon orbit survived, and the 49-unit ring was larger than the moon's real gravitational reach (Hill radius ≈ 38).
3. **Capture burns used the planet's frame,** about 42° off moon-relative retrograde.
4. **Moons were advanced outside the integrator step,** causing 2–11 units of post-flyby error live and 4–35 in the preview.
5. **HUD labels used the planet's frame** inside a moon's SOI.
6. **The two SOIs overlap by about 26 units at conjunction.** Any dominance rule based on position alone abruptly hands an outer-moon orbit wider than ~38 units to the inner moon. Found while testing the candidate and fixed with sticky dominance.

**Candidate model:** dominant-body gravity with SOI = Laplace radius r·(μ/M)^0.4 (inner ≈ 40, outer ≈ 61). Dominance is **sticky**: the craft stays with its current body until it leaves that body's SOI. Moons are advanced inside the step; moons are solid; prograde/retrograde, orbit labels and forecast are relative to the dominant body. The forecast reports `CAPTURE · <MOON> ORBIT · HOLDS THROUGH T+n` **only if the propagated forecast stays bound inside the SOI for the whole horizon** (DV-033), otherwise `LEAVES` or `IMPACT`, and always shows the horizon.

**Verified:**
- Zero JS errors on desktop and emulated phone.
- Forecast closest approach equals live within 0.03 units and 0.03 time.
- Live equals a 20× finer reference within 0.6; preview equals live within 1.1.
- Every tested moon orbit (both moons, both directions, radii 16–56, near and far side) holds 1,500 time units within ±2 units, across several conjunctions.
- Real-UI capture end to end: the slider forecast reads LEAVES up to −9, CAPTURE at −10 and −11, IMPACT from −12. The committed −10 burn held for 400t, and a forecast impact impacted.
- Node placement and drag, expiry, committed execution, affordability, discovery, and real-click Pause/Reset all work.

**DV-037 comparison (exact capture window = range of retrograde Δv at periapsis that captures without impact):**
| Variant | Inner SOI | Window at 20 units, inner / outer | SOI overlap |
|---|---|---|---|
| A physical (current) | 40 | 2.4 / 2.7 | 26 |
| B SOI ×1.3 | 52 | 2.7 / 3.1 | 57 |
| C moon mass ×1.5 | 47 | 3.2 / 3.6 | 44 |
| D both | 62 | 3.6 / 4.0 | 80 |

All variants are equally deterministic and forecastable; tuning only widens the window. A non-physical "auto-capture below a threshold" model was not built, because it would make the forecast and execution rules diverge unless shown explicitly (DV-031).

**DV-039/040 capture loop, verified by automated tests (2026-11-23):**
- **Orbiting:** after the −10 moon-relative capture burn, 8.1 revolutions in 150t at 19.6–23.6 units, labelled `INNER MOON ORBIT`.
- **New node:** a real mouse click on the drawn moon orbit placed a node exactly at the aimed time; the timing slider spans one moon period (≈18).
- **Departure:** prograde burns of 2–4 forecast `LEAVES INNER MOON`, and the craft leaves.
- **SOI exit continuity at single-step resolution:** no position or velocity jump; only acceleration changes (0.064 → 0.039 per step).
- **Energy:** moon-relative drift 1.5×10⁻⁴ while orbiting; planet-frame drift 2×10⁻⁷ while coasting after exit.
- **Forecast vs live** after departure: ≤0.24 units until the next SOI entry.

**DV-041/042 Orbit Legend, implemented:**
- Collapsed `<details>` at bottom-left: click, tap, Tab + Enter/Space, or the **L** key. Opening it hides the help text; the body scrolls on small screens.
- 12 entries plus 2 notes. Every swatch is drawn by the same glyph functions and style table (`ST`) as the game, so a visual change updates both.
- Symbol fixes from the audit:
  - discovery ring now dotted (SOI ring stays solid);
  - active SOI ring drawn thick;
  - discovered moons show ✓ on the body and in the label;
  - the encounter marker shows a centre dot when inside the SOI (not colour alone);
  - the burn vector has an arrowhead;
  - the craft points along its motion relative to the dominant body;
  - the old index-sampled forecast dots are replaced by **genuine time ticks every 10 s after the burn** (within 0.17 s, the sample spacing).
- Verified on desktop and a 390 px phone: Tab order (Pause → Reset → speed → legend), visible focus ring, Enter/Space toggle without pausing, L toggles, Space elsewhere still pauses, tap open/close, swatch canvases `aria-hidden` with text descriptions.
- Not verified: no screen-reader or colour-vision testing beyond these structural checks; no real-device touch test.

**Open:** label crowding at moons with no camera or zoom; genuine sensitivity of multi-revolution encounters (the marker can jump with a 0.2 slider change; live play matches); the mobile node panel covers the play area; no camera or zoom; the burn slider step (0.2) is coarse relative to a ~2.4 capture window.

## 0.7.2 Navigation & Clarity — implemented candidate on feature branch (2026-11-23)
**Branch:** `feature/navigation-clarity-0.7.2`, based on 0.7.1 `fix/0.7-patched-conic-physics`. **Implementation status: Implemented candidate, not browser-playtested or Verified.** Source now includes bounded cursor-wheel zoom, pinch midpoint zoom, visible +/- buttons, Focus craft and Reset view, fine 0.05 delta-v burn slider and +/- buttons with keyboard arrows, current relative speed, at-node pre/post burn relative speed and named orbital reference, explicit forecast horizon in the node panel, and short SOI entry/exit, capture and discovery observations. Camera transforms are presentation-only. The existing Orbit Legend remains. No new manoeuvre type or gameplay economy was added.

**Outstanding validation:** actual browser JS execution, mobile multi-touch gesture interaction, camera coordinate precision, zoomed node drag, accessibility, numerical readout accuracy, capture tests and regression tests have NOT been run in this session. Do not claim these passed. Owner review required. Source branch must be reconciled with documentation PR #4 and 0.7.1 physics PR #3 before merge. No deployment was performed.
