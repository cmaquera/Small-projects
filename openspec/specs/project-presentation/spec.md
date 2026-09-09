# project-presentation Specification

## Purpose

Defines the hygiene rules a project folder must meet to be part of the personal JS archive: a discoverable entry point, an accurate and descriptive page title, and run documentation for server-backed projects.

## Requirements

### Requirement: Discoverable entry point
Every project in the archive SHALL have an `index.html` file in its folder so the project can be opened directly from the index page.

#### Scenario: Opening a project folder
- **WHEN** a project folder is opened from the index page or directly in a browser
- **THEN** the project's `index.html` renders its interface

#### Scenario: Removed project has no entry point
- **WHEN** a project is removed from the archive
- **THEN** its folder is deleted entirely and it no longer appears on the index page

### Requirement: Accurate and descriptive page title
Every project page SHALL declare a browser-tab title that accurately describes the project, with no generic, mismatched, placeholder, or misspelled titles.

#### Scenario: Viewing a project's browser tab
- **WHEN** a user opens any project page
- **THEN** the browser tab shows a title matching the project's name

### Requirement: Run documentation for server-backed projects
Projects that require a server (dependencies or a database) SHALL include a `README.md` in their folder documenting prerequisites and the start command.

#### Scenario: Reading how to run a server project
- **WHEN** a user opens a server-backed project folder
- **THEN** a `README.md` states the prerequisites and the command to start the project