## Context

The repo root contains 15 folders, of which 11 are mini JS projects (identified by an `index.html` in some cases) plus `.opencode/` and `openspec/` which are tooling and must not appear in the listing. See proposal.md for motivation. There is no existing landing page or shared theme across projects; each project is independent static HTML/JS/CSS.

## Goals / Non-Goals

**Goals:**
- A single static `index.html` at repo root that discovers and lists project folders
- Each entry links to the project's `index.html` (or its folder if `index.html` is absent)
- Lightweight, no build step, works when opened directly from the filesystem
- Auto-discovers folders so adding a new project folder requires minimal/no edit

**Non-Goals:**
- Live server, framework (React/Vue/etc.), or package manager
- Modifying any existing project folder or its code
- Runtime introspection or automation that reloads the list dynamically from the filesystem after load

## Decisions

**Static HTML/CSS/JS, no framework** — Chosen because the repo is plain static projects with no build tooling. Alternative (a Node server or static-site generator) would add an unnecessary dependency and break direct-open-from-disk usage.

**Manual registration of project cards on first version** — The page defines the project list (name, description, link) in an in-page data structure (e.g. a JS array or a plain HTML list). This is simple, reliable, and works offline. Alternative considered: a build-time script that scans folders and generates the list automatically — deferred because the repo has no build step; if desired later it can slot in without changing the page's behavior.

**Link target logic** — Each entry links to `./<folder>/index.html`. For the projects confirmed to have an `index.html` (Box2D-esferas, Ford-fulkerson, Formularios-PHP-Ajax, Graphs-particles, Mose-detection-browser, Motion-detection-browser, Multiplayer-shoot-game, Platformer-game-phaser, Streaming-Socket.io, Touch-detection-browser), this opens the app directly. For the folders without `index.html` (Database-game, Particulas-JS, Server-control-arduino), the link points to `./<folder>/` so the browser shows the folder listing. Assumption recorded: the probe for `index.html` presence was a filesystem check at planning time; if a `Database-game`/`Particulas-JS`/`Server-control-arduino` index exists later, its link resolves naturally.

**Exclusion of non-project folders** — `.opencode/` and `openspec/` are excluded from the listing because they are tooling, not projects.

**Visual grouping** — Projects are shown as cards/grid with a title and short description for readability, with the project folder names humanized (e.g. `Mose-detection-browser` → "Mose Detection Browser").

## Risks / Trade-offs

- **Descriptions become stale** → Keep them short and derived from folder names; updates are single-line edits in the in-page data structure.
- **A future folder without `index.html` shows a raw directory listing** → Acceptable fallback; the link target logic already degrades to `./<folder>/`.
- **Manual list can drift from actual folders** → Mitigated by choosing names/descriptions per current folders and treating additions as a small maintenance edit; a generated variant is a documented possible follow-up.

## Migration Plan

Deploy by adding the single new `index.html` at the repo root. Rollback is trivial: delete the file. No existing files are touched, so there is nothing to migrate.

## Open Questions

None.
