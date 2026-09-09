## 1. Entry points and deletions

- [x] 1.1 Verify Particulas-JS has an `index.html` that renders standalone, and confirm the folder contains no orphan html files
- [x] 1.2 Delete the `Server-control-arduino` folder entirely, verifying it no longer exists on disk and `git status` shows the deletion
- [x] 1.3 Remove the Server-control-arduino card from the root `index.html` landing page, verifying the dead link is gone

## 2. Titles

- [x] 2.1 Update `<title>` in Ford-fulkerson/index.html to "Ford-Fulkerson Algorithm", verifying the title tag renders in the file
- [x] 2.2 Update `<title>` in Graphs-particles/index.html to "Graphs & Particles", verifying the title tag renders in the file
- [x] 2.3 Update `<title>` in Mose-detection-browser/index.html to "Mose Detection Browser", verifying the title tag renders in the file
- [x] 2.4 Update `<title>` in Streaming-Socket.io/index.html to "Streaming Socket.io", verifying the title tag renders in the file
- [x] 2.5 Update `<title>` in Touch-detection-browser/index.html to "Touch Detection Browser" (fixing the "detetion" typo), verifying the title tag renders in the file

## 3. Documentation

- [x] 3.1 Add Database-game/README.md documenting prerequisites (Node, MySQL), `npm install`, and start command `node app.js`, verifying the file exists with those sections

## 4. Verification

- [x] 4.1 Re-run `openspec validate` on the change and confirm every project folder still has an entry on the landing page with no dead links