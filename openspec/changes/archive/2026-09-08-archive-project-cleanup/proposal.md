## Why

The repo is a personal dev archive, so the goal is being able to open, understand, and run each project easily. Three projects are disrupted: Particulas-JS has no clear entry (user already fixed this by renaming `particulas.html` → `index.html`), Database-game offers no docs on how to run it (needs Express + MySQL), and Server-control-arduino is a headless lone `.js` with no UI that doesn't belong in a browser-oriented archive. Several page titles are also generic, mismatched, or misspelled.

## What Changes

- Confirm Particulas-JS has an `index.html` entry point (already applied by the user)
- **(BREAKING)** Delete the `Server-control-arduino` folder — it has no UI, cannot be presented as a page, and is out of scope for the archive
- Add run documentation for Database-game (prerequisites: Node, MySQL; start command)
- Improve page titles in HTML files so each project's browser-tab title is accurate and descriptive (not generic like "Algoritmo", mismatched like "Fundamentals", placeholder like "...Video", or misspelled "detetion")
- Update the index page to remove the deleted project card

## Capabilities

### New Capabilities

- `project-presentation`: Defines the hygiene rules a project folder must meet to be part of the archive — a discoverable entry point and an accurate, descriptive title (and run docs for server-backed projects)

### Modified Capabilities

None

## Impact

- Deleted: `Server-control-arduino/` (folder with `arduino.js`)
- Added: `Database-game/README.md` documenting how to run
- Edited: `<title>` tags in several project `index.html` files
- Edited: root `index.html` landing page (remove Server-control-arduino card)
- No code logic changes to any kept project