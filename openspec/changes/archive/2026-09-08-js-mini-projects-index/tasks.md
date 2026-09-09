## 1. Create the landing page

- [x] 1.1 Create `index.html` at the repo root containing a self-contained static page with inline CSS and an in-page project data structure, and verify the file exists and opens without errors when loaded directly from disk
- [x] 1.2 Populate the project data with all 12 project folders (name, description, link), verifying each project folder at the root is represented in the listing

## 2. Rendering and behavior

- [x] 2.1 Render each project as a card/grid entry with its name and description, and verify the full list renders in the browser
- [x] 2.2 Point each entry's link at the project's `index.html` where it exists and at `./<folder>/` where it does not, and verify clicking each link opens the correct target
- [x] 2.3 Exclude non-project folders (`.opencode`, `openspec`) from the listing, and verify they do not appear in the rendered page

## 3. Verification

- [x] 3.1 Open the landing page directly from the filesystem (no web server) and verify all projects render and all links navigate to their project folders
