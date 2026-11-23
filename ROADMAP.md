# DELTA-V — Roadmap
**Current:** 0.6 One Orbit, One Decision prototype on prototype branch; requires browser playtest.

1. **0.6 — One-node baseline (implemented, not browser-verified):** replace automated targeting with one future manoeuvre node, signed prograde/retrograde burn, projected flight path, automatic committed execution, uncommitted expiry, moving moon discovery.
2. **0.6 refinement:** fix input and prediction discrepancies, improve timing feedback, observe whether players understand orbital phase. Consider an explicit time scrub only if testing warrants it.
3. **0.7 conditional:** add simplified coherent moon SOI and moving-body flyby physics if the one-node loop is satisfying.
4. **Later:** meaningful local exploration progression, coherent procedural neighbourhoods, broader system scale, delta-v economy decisions.
5. **Far future:** interstellar transition model, full experience, release preparation.

**Gate:** Do not add complexity until the player can predict a useful orbit and make a deliberate moon encounter without an automated solver.

## 0.7 active experiment
Small central-planet / two-moon playground with approximate localized moon gravity, SOI visualization and time-synchronized balanced encounter forecast is committed to prototype branch. Next gate: browser playtest, numerical prediction/execution comparison and performance. Then refine tactile placement and distinct commit/execution feedback; only then evaluate genuine capture/assist readability. No larger system or progression until validated.

## Revised owner-approved roadmap direction (2026-11-23)
**Immediate gate — 0.7.1 physics reliability:** Claude should reproduce the reported anomalous moon-capture orbit, compare simplified dominant-body versus gameplay-tuned deterministic gravity, verify SOI transitions, capture classification and forecast/live agreement. Preserve validated manoeuvre-node, encounter-highlighting and one-pass pressure. No additional gameplay features while reliability is unresolved.

**0.8 proposed — meaningful encounters:** Clear and accurate flyby/capture/escape consequences and readable forecast horizons, no additional action buttons or currencies.

**0.9 proposed — first designed journey:** Handcrafted compact neighbourhood with navigationally distinct bodies and opportunity chains, without mandatory precision assists.

**1.0 prototype milestone proposed — complete small loop:** Depart, encounter, optionally capture or fly by, continue, and reach a satisfying run conclusion. These labels are provisional and not authorization to implement new phases.

**Design filter:** Does a change improve observe → plan → commit or pass → travel → encounter → reassess? If not, defer it. Gameplay-first deterministic orbital physics supersedes realism as a constraint. Old roadmap items remain historical context only.

## 0.7.1 refinement scope clarification (2026-11-23)
Owner prioritizes **dynamic moon-relative SOI capture** and an **accessible collapsible Orbit Legend** alongside physics reliability. Claude should test SOI entry, relative burn direction, genuine bound moon orbit, multiple local revolutions, subsequent manoeuvre and escape, boundary stability, and forecast/execution agreement. Inspect actual canvas glyphs and ensure every important line, ring, marker, trail and status is explained by a matching accessible legend. This is a refinement to the current prototype, not a new gameplay system. Do not begin 0.8 feature expansion until these are trustworthy and playtested.

## 0.7.2 Navigation & Clarity — approved scope, implementation pending (2026-11-23)
**Dependency:** Reconcile 0.7.1 dominant-body capture/legend candidate on PR #3 and obtain owner playtest feedback; do not overwrite Claude's physics branch or treat automated verification as owner acceptance.
**Pass A — camera and precision:** cursor/pinch-centred bounded zoom, visible +/- controls, Focus spacecraft, Reset camera framing, fine burn +/- and keyboard steps. Validate world-to-screen transforms, hit testing and touch gestures.
**Pass B — information and context:** current and at-node pre/post burn relative speeds with named body reference, explicit forecast horizon and current/future reference, minimal event-driven observations. Avoid solver hints or mission markers.
**Gate:** user can zoom to plan a moon capture, adjust burn accurately, understand the frame and outcome horizon, and choose a manoeuvre without stumbling over missing interface information. Physics and finite delta-v unchanged; test desktop/mobile/keyboard and preserve the accessible Orbit Legend. No 0.8 feature expansion bundled into 0.7.2.
