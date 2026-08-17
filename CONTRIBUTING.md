# Contributing

Corrections, clearer explanations, accessible design improvements, and updated resource links are welcome.

1. Open an issue describing the learner problem being solved.
2. Keep examples synthetic and remove credentials, private data, and proprietary client material.
3. Make curriculum behavior changes through a pull request.
4. Run `npm run check` before requesting review.
5. Explain how the change improves a learner outcome.

Lab contract changes belong in `labs/catalog.json`. Run `npm run labs:scaffold -- --apply --force`, update the generated package lock for affected labs, and verify both the passing normal baseline and intentional failing starter incident. Never overwrite a learner fork’s completed lab with the scaffold command.

Do not submit copied course material or code from repositories whose licenses do not permit reuse.

Curriculum changes must also follow [the visual teaching standard](VISUAL-TEACHING-STANDARD.md). Add or update the diagram when a concept, sequence, system boundary, or decision path changes. Color supplements labels; it never carries meaning alone.
