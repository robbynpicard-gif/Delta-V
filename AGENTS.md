# Shared assistant protocol — DELTA-V
Applies to Claude Code, ChatGPT and other contributors.

## Before work
1. Read README.md, AGENTS.md, GAME_DESIGN.md, CREATIVE_DIRECTION.md, DECISIONS.md, ROADMAP.md, STATUS.md and PROTOTYPE.md.
2. Inspect the actual branch and implementation; do not infer code state from design prose.
3. Use statuses **Approved / Proposed / Experimental / Implemented / Verified / Superseded** accurately.
4. Keep the scope minimal; obtain owner approval before materially expanding the design.
5. Prioritize clear orbital cause/effect, simple tactile decisions, and discovery over feature count or simulation complexity.

## Collaboration
- GitHub is canonical; chats are not automatically synchronized.
- Record approved decisions in DECISIONS.md and keep design/status documents aligned.
- Work on the prototype branch / PR; do not silently merge main.
- Fetch current file SHA before updates; avoid overwriting concurrent work.
- Verify code when possible; never claim a browser playtest or deployment check not performed.
- No new dependencies, monetization, telemetry, major systems or third-party assets without approval.
- Original art and audio only.

## Current authorization
Owner explicitly authorized replacing the targeting system and establishing the **0.6 One Orbit, One Decision** prototype baseline. Subsequent expansion beyond this focused experiment requires further approval. Earlier preproduction-only restriction is superseded.

## Done
Commit confirmed, docs consistent, test limitations disclosed, open issues identified.

## Latest owner authorization
Owner explicitly requested a **small 0.7 prototype with a small system of visitable bodies, each with SOI**, following the approved balanced encounter forecast. Treat localized moon gravity as an experiment, not verified physics or a permanent production decision.

## Current design gate — owner-approved revision (2026-11-23)
Read the latest revision in DECISIONS.md (DV-031 onward), GAME_DESIGN.md, ROADMAP.md and STATUS.md. Gameplay-first **deterministic and forecastable** orbital rules supersede realism as a hard constraint. Keep the one-node prograde/retrograde, commit-or-pass, finite-delta-v loop. Owner reported anomalous motion after an attempted moon capture; do not assume the cause or claim capture verified. Claude physics refinement/testing is the immediate next task; no broader feature implementation authorized. Historical contradictory instructions above are superseded where the latest decisions explicitly say so.

## Latest owner priorities — 0.7.1 (2026-11-23)
Owner explicitly requested two core refinements: (1) dynamic moon-relative SOI capture with a retrograde burn that can establish a bound orbit when feasible, and continued moon orbit/departure; (2) a compact accessible collapsible Orbit Legend explaining every significant orbital glyph/line/ring/marker and status, using more than colour. Read DV-039–DV-042 and current STATUS.md. Inspect source and test before claiming physics correctness or UI accessibility. Preserve existing single-node manoeuvre loop; no broader features. Do not confuse SOI entry with capture or guarantee capture from retrograde alone.
