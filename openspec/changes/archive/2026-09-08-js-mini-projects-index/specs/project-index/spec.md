## Purpose

Provides a landing page at the repo root that lists every mini project in its own folder, linking to each project and giving a brief description so visitors can discover and open any project easily.

## ADDED Requirements

### Requirement: Landing page at repo root
The system SHALL provide an `index.html` file at the repository root that serves as a landing page for all mini projects.

#### Scenario: Opening the repo root
- **WHEN** a user opens the repository root in a browser
- **THEN** the landing page is displayed listing all mini projects

### Requirement: List projects from folder structure
The landing page SHALL list each project folder at the repository root, excluding non-project folders such as `.opencode` and `openspec`.

#### Scenario: Enumerating project folders
- **WHEN** the landing page renders
- **THEN** every top-level project folder is included in the listing and non-project folders are excluded

### Requirement: Link to each project
Each listed project SHALL link to its folder so the user can open the project directly.

#### Scenario: Opening a project with an index.html
- **WHEN** the user clicks a project that has an `index.html` in its folder
- **THEN** the browser navigates to that folder's `index.html`

#### Scenario: Opening a project without an index.html
- **WHEN** the user clicks a project whose folder has no `index.html`
- **THEN** the browser navigates to the folder listing or an equivalent entry point

### Requirement: Project description
The landing page SHALL display each project with a short human-readable description to inform the visitor what the project does.

#### Scenario: Viewing descriptions
- **WHEN** the landing page renders the project list
- **THEN** each project shows a name and a short description

### Requirement: Self-contained page
The landing page SHALL work without a build step or server-side processing, using only static HTML, CSS, and JavaScript.

#### Scenario: Open directly from filesystem
- **WHEN** the user opens the landing page directly from disk without a web server
- **THEN** the page renders and lists all projects correctly
