## Why

The repo contains 10+ mini JS projects (Canvas games, browser detection tools, Socket.io experiments, etc.) each in its own folder. There is no central index page to discover and navigate between them. A visitor landing on the repo has no overview of what projects exist or how to open them.

## What Changes

- Create a single `index.html` at the repo root that serves as a landing page listing all mini projects
- Each project links to its own folder's `index.html` (or root if no index exists)
- Projects are displayed with a short description and are auto-discoverable from the folder structure

## Capabilities

### New Capabilities

- `project-index`: Landing page at repo root that lists and links to all mini JS projects, with descriptions and visual grouping

### Modified Capabilities

None

## Impact

- New file: `index.html` at the repo root
- No changes to existing project folders or their code
- Purely additive, no breaking changes
