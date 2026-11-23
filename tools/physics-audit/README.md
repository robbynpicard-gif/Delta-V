# Physics audit scripts (dev-only, optional)
Not loaded by the game. Requires Node, Playwright and Chrome on the tester's machine; this is **not** a game dependency. Delete this folder if the owner prefers no tooling in the repo.

Run them from this folder:
    python3 mk.py ../../index.html new.html      # instrumented copy: exposes closure via window.__dv.ev
    node capture_end_to_end.mjs                  # flyby → in-SOI capture burn → 400t orbit; impact case
    node regressions.mjs new.html                # forecast stability, draw cost, expiry/commit/affordability/discovery, pointer
    node forecast_stability.mjs                  # encounter-marker jumps within SOI while scrubbing burn
`forecast_vs_reference.mjs` and `gravity_models.mjs` were written against the pre-fix 0.7 page (`python3 mk.py <old index.html> orig.html`). They reproduce the diagnosis. Randomness is seeded and the game loop is driven manually, so every run is deterministic.
    node departure_continuity.mjs                # capture → orbit → departure; single-step SOI-exit continuity, energy, forecast vs live
    node moon_orbit_overlap.mjs new.html         # circular moon orbits, 1500t through conjunctions (sticky dominance)
    node time_ticks.mjs                          # forecast dots fall on genuine 10 s ticks
    node legend_access.mjs                       # legend: Tab order, Enter/Space/L, focus ring, touch (opens ../../index.html directly)
