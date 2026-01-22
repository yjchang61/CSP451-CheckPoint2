# Conflict Resolution Report

## 1) Conflict Scenario

The conflict occurred in the file `src/app.js`, specifically within the `app.listen` callback function responsible for starting the server.

The branches involved were:
*   `feature/database-connection`: This branch modified the server startup to include an asynchronous database initialization step. It changed the function to `async` and added a log message: `"Initializing Database Connection..."`.
*   `feature/api-endpoints`: This branch modified the same lines to make the startup message more specific to the API functionality. It changed the log message to: `"API Server ready..."` and added a secondary log `"Endpoints available at /api/v1"`.

Because both branches edited lines 36-39 (the `app.listen` block) starting from the same base commit, Git could not determine which version to keep when I attempted to merge `feature/api-endpoints` into `main` (after `feature/database-connection` had already been merged).

## 2) What You Saw

Git paused the merge and flagged a `CONFLICT (content)` in `src/app.js`. When opening the file, I saw standard conflict markers separating the two divergent states:

```javascript
<<<<<<< HEAD
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Initializing Database Connection...");
  // Simulated DB init
=======
app.listen(PORT, () => {
  console.log(`API Server ready at http://localhost:${PORT}`);
  console.log("Endpoints available at /api/v1");
>>>>>>> feature/api-endpoints
```

## 3) Resolution Strategy

My strategy was to **combine** the changes rather than choosing one over the other, as both features (database logic and API endpoints) are required for the final application.

1.  **Async function**: I kept the `async` keyword from the `HEAD` (database) version because database connections are inherently asynchronous and we need to support `await` operations in the future.
2.  **Log Messages**: I decided to keep the standard "Server running" message but append *both* operational logs. I kept the database initialization log to confirm DB connectivity and added the API endpoints log to inform developers where to access the API.
3.  **Cleanup**: I removed the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and corrected a syntax error (a duplicate `});` closure) that I accidentally introduced during the initial manual edit.

I verified the fix by running `npm run dev`. The terminal successfully verified that the server started and printed both:
*   `Initializing Database Connection...`
*   `Endpoints available at /api/v1`

## 4) Prevention Methods

In a real team environment, this conflict could have been prevented using:

1.  **Frequent Communication**: If the developer working on the DB module knew someone was updating the API startup logs, they could have agreed on a standard logging utility instead of both editing `app.js` directly.
2.  **Modular Initialization**: Instead of putting all logic inside `app.listen` in `app.js`, we could split startup logic into separate files (e.g., `src/loaders/database.js` and `src/loaders/express.js`). This follows the Single Responsibility Principle; if logic is separated, files are less likely to be touched by multiple people simultaneously.
