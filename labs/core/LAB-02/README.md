# LAB-02 — Select and defend an accessible UI system

This is your isolated browser lab for milestone 2. It uses synthetic fixtures only.

Before changing the panel, use [the visual story-writing guide](../../../resources/visual-story-writing.md) and [agency story template](../../../templates/agency-user-story.md) to describe its user outcome, acceptance examples, important UI states, and responsive/accessibility failure path. Render the Markdown and ask Codex to identify any mismatch between the story, diagram, and lab contract.

1. Run `npm install` and `npm run dev`.
2. Read the ticket and predict the failing layer.
3. Run `npm test` for the healthy baseline.
4. Run `npm run incident` to reproduce the seeded failure.
5. Make the smallest repair in `lib/scenario.ts` and the milestone-specific challenge file.
6. Run `npm run test:challenge`, inspect the diff, and complete `evidence/labs/LAB-02.md`.

The upstream starter intentionally fails the challenge test. Curriculum CI verifies that fail-before state. Once your evidence file exists in your fork, CI requires your recovery test to pass.
