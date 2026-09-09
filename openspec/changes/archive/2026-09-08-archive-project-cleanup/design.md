## Context

See proposal.md - Why. The archive has 13 folders; one (Server-control-arduino) is scheduled for deletion and Particulas-JS already got its `index.html`. The landing page (`index.html` at root) lists projects with hand-written cards. Titles needing fixes: Ford-fulkerson ("Algoritmo"), Graphs-particles ("Grafos"), Mose-detection-browser ("Fundamentals"), Streaming-Socket.io ("...Video"), Touch-detection-browser ("detetion" typo).

## Goals / Non-Goals

**Goals:**
- Every kept archive project opens via a clear entry point with an accurate title
- Server-backed projects have run docs
- Landing page reflects removed project and fixed titles
- No logic/behavior changes to any kept project

**Non-Goals:**
- Renaming project folders (would break existing links/history — only `<title>` tags change)
- Restyling or refactoring any project's code
- Adding READMEs to every static project (only the server-backed one needs run docs)

## Decisions

**Fix `<title>` tags only, not folder names** — Folder renames ripple through the landing page, git history, and the design already humanizes names for display. `Mose-detection-browser` stays as-is as a folder; its `<title>` becomes accurate. Titles chosen to match the folder's display name so your index page and browser tabs agree.

**Title mapping** — Please confirm: For Ford-fulkerson → "Ford-Fulkerson Algorithm", Graphs-particles → "Graphs & Particles", Mose-detection-browser → "Mose Detection Browser", Streaming-Socket.io → "Streaming Socket.io", Touch-detection-browser → "Touch Detection Browser". Other projects (Box2D-esferas, Platformer-game-phaser, Multiplayer-shoot-game, Motion-detection-browser) already have acceptable titles and are left unchanged.

**Server-control-arduino deletion** — Whole folder removed; also remove its card from root `index.html` so no dead link remains. This is a breaking change flagged in the proposal.

**Database-game README** — The app is Express + MySQL (`app.js`, `package.json` deps: express, mysql). README documents: `npm install`, prerequisites (MySQL running), and start command `node app.js`. MySQL schema/credentials are unknown; the README notes the user must configure them. This is the minimal honest doc given I cannot run it.

## Risks / Trade-offs

- **MySQL schema unknown** → README states DB config is user's responsibility rather than inventing credentials.
- **Title edits could break pages if `<title>` is referenced** → spot-check each edited file after change; titles are only presentation, no JS/CSS reads them.
- **Deleting a folder is irreversible** → confirmed scope from user; no version control commit is made in this change, so git history still holds it.

## Migration Plan

Deploy all changes in one pass. Rollback: restore deleted Server-control-arduino from git and revert `<title>` edits — all tracked files, so nothing is permanently lost.

## Open Questions

None — the two assumptions (titles scope, Database-game = README) are recorded above and in the proposal.