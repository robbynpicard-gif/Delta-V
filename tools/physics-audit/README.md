# Physics audit scripts (dev-only, optional)
Not loaded by the game. Requires Node, Playwright and Chrome on the tester's machine; this is **not** a game dependency. Delete this folder if the owner prefers no tooling in the repo.

Run them from this folder:
    python3 mk.py ../../index.html new.html      # instrumented copy: exposes closure via window.__dv.ev
    node capture_end_to_end.mjs                  # flyby → in-SOI capture burn → 400t orbit; impact case
    node regressions.mjs new.html                # forecast stability, draw cost, expiry/commit/affordability/discovery, pointer
    node forecast_stability.mjs                  # encounter-marker jumps within SOI while scrubbing burn
`forecast_vs_reference.mjs` and `gravity_models.mjs` were written against the pre-fix 0.7 page (`python3 mk.py <old index.html> orig.html`). They reproduce the diagnosis. Randomness is seeded and the game loop is driven manually, so every run is deterministic.
