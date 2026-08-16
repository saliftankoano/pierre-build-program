# Project instructions

## Product

- Read `docs/PRODUCT.md` before planning.
- Ask about material unknowns; do not invent client decisions.
- Implement only the linked story and preserve its non-goals.

## Stack and boundaries

- Next.js App Router, React, strict TypeScript, Tailwind, and the documented component foundation.
- Prefer Server Components; add `"use client"` only for a browser capability or interaction that requires it.
- Secrets stay server-only. Only intentionally public values use the framework's public prefix.
- Validate untrusted input at the server boundary and enforce authorization at the data boundary.

## Quality

- Run `npm run check`, `npm test`, `npm run test:e2e`, and `npm run build` as relevant.
- Test loading, empty, error, keyboard, mobile, and unauthorized states.
- Update architecture/decision/environment/debugging docs when behavior changes.
- Finish with a diff summary, evidence, risks, and a plain-language code explanation.
