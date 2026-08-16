# Northstar Design Handoff

## Product direction

Calm, precise, evidence-oriented, and readable under pressure. Avoid “hacker” imagery, neon green-on-black styling, decorative terminal text, fake shields, and claims of compliance.

## Navigation by role

- Client: Overview, Cases, New case, Organization, Help.
- Investigator: Queue, Cases, Assigned to me, Notifications.
- Administrator: Dashboard, Cases, Organizations, Members, Activity.

## Core screens

1. Sign-in and safe onboarding failure states.
2. Role dashboard with next actions, not vanity charts.
3. Case list with status, reference, assignee, and updated time.
4. Case detail with overview, evidence metadata, activity, and actions.
5. Guided intake with save/resume, validation summary, and upload states.
6. Membership/assignment management for administrators.

## Accessibility and responsive constraints

- Never communicate case status by color alone.
- Tables must become understandable cards or horizontally contained regions on small screens.
- Focus moves to validation summaries and dialogs restore focus when closed.
- Destructive/privileged actions require explicit labels and confirmation proportional to risk.
- Dates show a readable display value and machine-readable timestamp; clarify the relevant time zone.
