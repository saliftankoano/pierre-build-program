# LAB-10 — Lead the AtlasOps production game day

This is your isolated browser lab for milestone 10. It uses synthetic fixtures only.

1. Run `npm install` and `npm run dev`.
2. Read the ticket and predict the failing layer.
3. Run `npm test` for the healthy baseline.
4. Run `npm run incident` to reproduce the seeded failure.
5. Make the smallest repair in `lib/scenario.ts` and the milestone-specific challenge file.
6. Run `npm run test:challenge`, inspect the diff, and complete `evidence/labs/LAB-10.md`.

The upstream starter intentionally fails the challenge test. Curriculum CI verifies that fail-before state. Once your evidence file exists in your fork, CI requires your recovery test to pass.
