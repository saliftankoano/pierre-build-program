# LAB-00 — Run the first Next.js change window

This is your isolated browser lab for milestone 0. It uses synthetic fixtures only.

## Browser delivery steps

1. Create `lab-00-approved` and `lab-00-conflict` from the same unchanged `main` branch. In each branch, use GitHub's web editor to change the normal handoff message in `lib/scenario.ts` differently.
2. Preview either branch by replacing `/tree/main` in your StackBlitz URL with `/tree/BRANCH_NAME`. Use the StackBlitz terminal for the commands below; you do not need local Git or Node yet.
3. Merge the approved PR first. Open the conflict PR second, use GitHub's conflict editor to preserve the approved message, explain every conflict marker, and commit the resolution.
4. Create and merge one separate harmless bad-message PR. Use that merged PR's **Revert** action, then merge the generated revert PR and verify that the accepted message returns.

## Build and incident loop

1. Run `npm install` and `npm run dev` in StackBlitz.
2. Read the ticket and predict the failing layer.
3. Run `npm test` for the healthy baseline.
4. Run `npm run incident` to reproduce the seeded failure.
5. Make the smallest repair in `lib/scenario.ts` and the milestone-specific challenge file.
6. Run `npm run test:challenge`, inspect the diff, and complete `evidence/labs/LAB-00.md`.

The upstream starter intentionally fails the challenge test. Curriculum CI verifies that fail-before state. Once your evidence file exists in your fork, CI requires your recovery test to pass.
