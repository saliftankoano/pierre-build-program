# LAB-01 — Diagnose the Codex and Vercel toolchain

This is your isolated browser lab for milestone 1. It uses synthetic fixtures only.

1. Run `npm install` and `npm run dev`.
2. Read the ticket and predict the failing layer.
3. Run `npm test` for the healthy baseline.
4. Run `npm run incident` to reproduce the seeded failure.
5. Make the smallest repair in `lib/scenario.ts` and the milestone-specific challenge file.
6. Run `npm run test:challenge`, inspect the diff, and complete `evidence/labs/LAB-01.md`.

The upstream starter intentionally fails the challenge test. Curriculum CI verifies that fail-before state. Once your evidence file exists in your fork, CI requires your recovery test to pass.
