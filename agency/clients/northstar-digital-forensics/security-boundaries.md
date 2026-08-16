# Northstar Security Boundaries

## Training threat model

Protect against cross-organization access, insecure direct object references, public storage, overly broad RLS, client-supplied role claims, unsafe upload metadata, leaked credentials, sensitive logs, notification disclosure, and unbounded AI processing.

## Required controls

- Resolve identity from the trusted session, never a submitted user ID.
- Derive role and organization membership from protected database state.
- Enforce row permissions with RLS and server-side checks for privileged actions.
- Keep storage private; authorize before producing a short-lived signed link.
- Validate file size and allowed harmless training types on the server.
- Record safe event identifiers and action metadata, not file contents or secrets.
- Keep service-role and provider credentials server-only.
- Test anonymous, client A, client B, investigator, administrator, revoked member, direct URL, database, and storage behavior.

## Non-claims

Do not describe this system as compliant, certified, tamper-proof, immutable, admissible, or production-ready for real evidence. Those claims require legal, procedural, infrastructure, and assurance work beyond this curriculum.
