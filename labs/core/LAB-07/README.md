# LAB-07 — Repair an AtlasOps row-level policy gap

This is an isolated browser lab for milestone 7. It uses synthetic fixtures only.

1. Run `npm install` and `npm run dev`.
2. Read the ticket and predict the failing layer.
3. Run `npm test` for the healthy baseline.
4. Run `npm run incident` to reproduce the seeded failure.
5. Make the smallest repair in `lib/scenario.ts`.
6. Run `npm run test:challenge`, inspect the diff, and complete `evidence/labs/LAB-07.md`.

The upstream starter intentionally fails the challenge test. Curriculum CI verifies that fail-before state. Once the evidence file exists in a learner fork, CI requires the recovery test to pass.
