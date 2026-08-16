# ClearPath Design Handoff

## Direction

Trustworthy, calm, local, and practical. Avoid luxury-home clichés, excessive animation, fake urgency, glassmorphism, and generic AI-generated copy.

## Content hierarchy

1. What ClearPath does and where.
2. Primary quote action and secondary phone action.
3. Trust proof that can be verified.
4. Service categories and how the process works.
5. Coverage, testimonials marked as fictional during training, FAQ, and final CTA.

## Design tokens

- Ink: `#102A2A`
- Evergreen: `#166534`
- Leaf: `#22C55E`
- Mist: `#F3F7F4`
- White: `#FFFFFF`
- Warning/error: use colors that meet contrast requirements and include text/icons.
- Body type: system sans or Geist; do not add a font dependency without reason.
- Maximum reading width: approximately 68 characters for body copy.
- Radius: modest 8–12px; buttons must remain recognizable as controls.

## Responsive wireframe

```text
MOBILE                         DESKTOP
┌──────────────────┐           ┌─────────────────────────────────────┐
│ Logo       Menu  │           │ Logo     Services Areas About  CTA │
├──────────────────┤           ├───────────────────┬─────────────────┤
│ Eyebrow          │           │ Eyebrow           │ Approved image  │
│ Clear promise    │           │ Clear promise     │ or illustration │
│ Support copy     │           │ Support copy      │                 │
│ [Get a quote]    │           │ [Get quote] [Call]│                 │
│ [Call]           │           │ Trust proof row   │                 │
│ Trust proof      │           └───────────────────┴─────────────────┘
└──────────────────┘
```

## Interaction states

Navigation and quote controls require hover, focus-visible, active, disabled, loading, success, and failure behavior. Respect reduced-motion preferences. On form failure, preserve non-sensitive user input and provide another contact path.
