# DELTA-V — Decision log

Statuses: **Approved**, **Proposed**, **Experimental**, **Implemented**, **Verified**, **Superseded**. Approved does not imply implemented.

- **DV-001 — Approved (2026-11-23):** DELTA-V is an exceedingly simple, run-based orbital exploration game about going as far as possible, not a comprehensive rocket simulator.
- **DV-002 — Approved:** Central interaction is hold spacecraft to pause, shape a prograde/retrograde burn with tactile informative trajectory preview, release to execute.
- **DV-003 — Approved:** Intuitive, internally consistent gravity, orbital momentum, flybys and SOI; physically produced capture/assist/landing outcomes instead of menu choices.
- **DV-004 — Approved:** Brief modifier-driven launch; orbit, interplanetary travel, planetary encounters, limited salvage/landing possibilities, meaningful range/resource/risk tradeoffs.
- **DV-005 — Approved:** Minimal economy of delta-v, materials, integrity; no unnecessary extra subsystems.
- **DV-006 — Approved:** Visual direction blends clean vector shapes and atmospheric minimalism.
- **DV-007 — Approved:** Mini Metro-like restrained hypnotic audio reference; emotional baseline peaceful and meditative, occasionally tense.
- **DV-008 — Approved:** Shared GitHub repository context for Claude and ChatGPT; browser testing before eventual Steam consideration.
- **DV-009 — Approved:** Art and sound discussion precedes any playable prototype request; implementation is not authorized yet.
- **DV-010 — Proposed:** Responsive generative tones tied to orbital events, with careful restraint.
- **DV-011 — Proposed:** First orbital toy scope as specified in GAME_DESIGN.md; implement only after authorization.
- **DV-012 — Proposed:** Procedurally varied coherent star systems, short runs and long-term upgrades; exact scope and pacing to validate.

## Exploration-first revision (2026-11-23)
- **DV-013 — Approved:** The game is an orbital exploration puzzle roguelite (puzzle mastery first, exploration discovery second), not a reflex-driven arcade game. Observe → Plan → Commit → Discover → Repeat.
- **DV-014 — Approved:** Start from a constrained-procedural celestial neighbourhood; physically coherent orbital relationships and accessible opportunities take priority over unrestricted randomness.
- **DV-015 — Approved:** Nearby charted objects and progressive discovery, without arbitrary fog-of-war, scanning chores, or instructional objectives.
- **DV-016 — Approved:** Delta-v is the sole base consumable resource for the core loop. Other resources/upgrades from older concepts are superseded for now; replenishment remains undecided.
- **DV-017 — Approved:** Reaching a celestial body's vicinity is a valid primary exploration objective; low-speed rendezvous/debris collection is optional, not mandatory.
- **DV-018 — Approved:** Nested planetary/stellar/galactic universe is a long-term vision, not a commitment to full continuous simulation. km/AU/parsecs are contextual display units. Interstellar mechanics unresolved.
- **DV-019 — Approved for experimentation:** SOI transitions and gravity assists as later physics milestones, only after basic transfers prove enjoyable.
- **DV-020 — Experimental:** Two-moon First Neighbourhood prototype; planning beyond delta-v with clear unaffordable indication; no automatic partial burns. Test against simpler affordability-constrained interaction.
- **DV-021 — Superseded:** Earlier default materials/integrity economy, launch phase, salvage, and debris-centred objectives are not part of the approved core loop. Exact-burn recommendations and automatic encounter slowdown are not default design commitments.

## 0.6 One Orbit, One Decision (2026-11-23)
- **DV-022 — Approved:** Replace burn-now targeting loop with one future manoeuvre node on the player's upcoming orbit. Timing and signed prograde/retrograde burn are the core player choices.
- **DV-023 — Approved:** Show the player's own current and projected post-burn trajectories, current celestial bodies and restrained travel-time markers; no automated burn suggestions, moon future positions, closest-pass ghosts or optimal-target solver by default.
- **DV-024 — Approved:** Planning pauses time. A committed node coasts to the selected execution time and burns automatically; uncommitted nodes expire if passed. The one-orbit limit applies to bound orbits, with a bounded horizon for escapes. No reflex QTE.
- **DV-025 — Approved:** Delta-v charged only upon execution; one active node; player may cancel before committing. Keep time acceleration for travel.
- **DV-026 — Superseded:** DV-002's immediate hold-craft burn, 0.3–0.5A.1 automated target assistance, and 0.5A Advance to approach are retired from the active prototype. Historical context remains.
- **DV-027 — Experimental / Implemented, not Verified:** Prototype 0.6 is a one-node, planet-gravity-only exploration toy. Node placement and drag affordances, one-orbit timing, preview agreement and discoverability require browser playtest. Moon SOIs and gravity assists remain future conditional work.

- **DV-028 — Experimental / Implemented, not Verified (2026-11-23):** 0.6.1 revises the 0.6 planning pause assumption. Time continues during node editing unless player voluntarily pauses; 0.25×–8× speed slider manages planning time. No automatic fast-forward after commit. Node expires uncommitted at first passage. The spacecraft is not a direct burn control. This supersedes DV-024's automatic planning pause, pending playtest.

- **DV-029 — Approved experimental direction (2026-11-23):** Balanced encounter forecasting: proposed trajectory, predicted closest separation, time to encounter and encounter highlight, without burn suggestions or solver. Burn commitment and execution should feel distinct and satisfying.
- **DV-030 — Experimental / Implemented, not Verified (2026-11-23):** Small 0.7 system with one central planet and two visitable moons, each with a localized smooth gravity influence zone. The physics approximation is not a validated physical SOI or capture model. Retain one-node, one-pass decision loop; assess encounter trust and gameplay before expanding.

## Gameplay-first orbital design revision — owner approved (2026-11-23)
- **DV-031 — Approved:** DELTA-V is an orbital exploration decision game, not a gravitational simulator. Player trust, deterministic rules and forecast/execution agreement outrank physical realism. Physics may be simplified or tuned, but not secretly inconsistent.
- **DV-032 — Approved:** Keep one future manoeuvre node, prograde/retrograde magnitude and timing, finite delta-v, and one-pass commit-or-pass pressure. A committed burn locks the decision and executes at the node. Distinct tactile feedback for planning, commitment and execution remains a design goal.
- **DV-033 — Approved:** Balanced forecasts show the proposed spacecraft path, encounter location, predicted separation and time, delta-v cost and remaining budget. Do not provide optimal burns or automatic target solutions. Display the forecast horizon; do not claim permanent capture from a finite preview.
- **DV-034 — Approved:** Exploration rewards reaching a body's vicinity; capture is a separate, more demanding navigational outcome. Flyby, capture and escape should create distinct subsequent opportunities, using the same manoeuvre controls rather than dedicated encounter buttons.
- **DV-035 — Approved:** Design celestial geography for accessible, meaningful opportunity chains. Initial systems should be handcrafted and small; assists reward mastery but are not mandatory for early exploration. Complexity should emerge from successive simple decisions.
- **DV-036 — Approved:** Freeze new gameplay systems until the capture anomaly is diagnosed and prediction/live physics are trustworthy. Set aside launch, salvage, debris, materials, integrity, upgrades, landing, large procedural generation and interstellar travel as active roadmap work. They are not categorically forbidden in the distant future.
- **DV-037 — Experimental:** Compare simplified dominant-body SOI physics with a gameplay-tuned deterministic orbital model. Exact implementation and capture classification remain unresolved; test before adopting either.
- **DV-038 — Proposed milestones, owner-approved direction but not implementation authorization:** 0.7.1 physics reliability; 0.8 meaningful encounter readability; 0.9 handcrafted opportunity chains; 1.0 small complete exploration loop. Version labels are provisional.
- **Supersession clarification:** DV-003's requirement for intuitive/physically emergent gravity is superseded **where it conflicts** with DV-031's gameplay-first deterministic model. DV-004/005's old launch/materials/integrity/salvage elements are superseded by DV-016 and DV-036. DV-014's procedural ambition is deferred behind handcrafted validation. DV-023's earlier prohibition on closest-approach display is superseded by DV-029/DV-033. DV-024's automatic planning pause is superseded by DV-028. DV-009's preproduction gate was superseded by explicit prototype authorization. Historical entries remain unchanged for traceability.
- **DV-039 — Experimental / Implemented on feature branch, not playtested (2026-11-23):** Under DV-037, the dominant-body SOI candidate is implemented on `fix/0.7-patched-conic-physics` (PR #3): Laplace-radius SOIs, sticky dominance, solid moons, burns and labels relative to the dominant body, and horizon-bounded capture forecasts. The original faded-SOI model is diagnosed as the cause of the capture anomaly. Tuned constants (SOI ×1.3, moon mass ×1.5) were compared numerically, not adopted. Adoption requires owner playtest and approval.
