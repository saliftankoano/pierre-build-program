# STORY-ID — Outcome-focused title

| Field | Value |
| --- | --- |
| Type | Story / bug / spike / chore / change / review |
| Priority | P0 / P1 / P2 / P3 |
| Parent epic | |
| Persona | |
| Estimate/timebox | |
| Owner | |

## User story

As a **persona**, I want **one capability** so that **business or user outcome**.

## Context

### Facts

### Preferences

### Assumptions to validate

### Unknowns or decisions required

## User and request flow

```mermaid
flowchart LR
    A["Trigger"] --> B["User action"] --> C{"Decision"}
    C -->|"success"| D["Valuable outcome"]
    C -->|"failure"| E["Safe recovery"]

    classDef action fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef decision fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef outcome fill:#dcfce7,stroke:#16a34a,color:#052e16;
    class A,B action;
    class C decision;
    class D,E outcome;
```

**Text route:** replace this sentence with the same path in plain language.

## Acceptance criteria

```gherkin
Given
When
Then
```

```gherkin
Given a relevant failure or boundary condition
When
Then the product fails safely and gives the user an actionable state
```

## Data and API contract

- Inputs and validation:
- Outputs and safe errors:
- Persisted records and ownership:
- External service and failure behavior:

## Experience expectations

- Loading:
- Empty:
- Error:
- Success:
- Mobile/responsive:
- Keyboard/focus:
- Reduced motion or other relevant preferences:

## Cross-cutting expectations

- Security:
- Privacy:
- Accessibility:
- Analytics:

## Dependencies

## Explicit non-goals

## Definition of Done

- [ ] Acceptance examples pass.
- [ ] Relevant automated checks pass.
- [ ] Security, privacy, accessibility, and analytics expectations are evidenced.
- [ ] Preview or production behavior is demonstrated.
- [ ] Important code is traced, explained, and modified through the comprehension gate.

## Evidence required

- Deployment/preview URL:
- Screenshots or recording:
- Test/check output:
- Diagram and trace:
- Remaining limitations:

## Codex critique and your decision

- Material question raised:
- Your answer:
- Recommendation accepted/rejected and why:
- Story sections changed:
