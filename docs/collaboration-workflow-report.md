# Collaboration Workflow Report

## 1. Branching Strategy
We used a Feature Branch Workflow.
- **Main Branch**: `main` (protected, production-ready code).
- **Feature Branches**:
    - `feature/user-authentication`: For login logic.
    - `feature/database-connection`: For DB setup.
    - `feature/api-endpoints`: For user API.

**Why this strategy?**
It allows parallel development. Each feature is isolated, preventing unstable code from breaking the main application until it is reviewed and tested.

## 2. Pull Request Lifecycle
For each feature:
1.  **Created Issue**: To track the requirement (e.g., "Implement Login").
2.  **Developed code**: On a specific feature branch.
3.  **Opened PR**: Linked to the issue (e.g., "Closes #1").
4.  **Code Review**: Added comments to simulate team feedback (e.g., "Check variable naming").
5.  **Merge**: Used "Squash and Merge" to keep the history clean (1 commit per feature).

## 3. Challenges & formatting
The main challenge was the merge conflict between the Database and API branches in `src/app.js`. Both branches modified the server startup code.
- **Solution**: We utilized GitHub's conflict resolution (or local resolution) to combine both the DB logs and the API logs into the final version.

## 4. Screenshot Evidence
*(Paste your screenshots here or keep them in the root folder as requested)*
*   [ ] PR 1 (Auth) Screenshot
*   [ ] PR 2 (DB) Screenshot
*   [ ] PR 3 (API) Screenshot
*   [ ] Merge Graph Screenshot
