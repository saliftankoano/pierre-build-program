# Milestone 8 — Authenticated Next.js Product

**Timebox:** 18 hours
**Mentor gate:** required
**Outcome:** a multi-user product with ownership, roles, protected storage, and tested authorization.

## Agency assignment

The product now needs real user boundaries. The client also requested a design revision and an apparently urgent sharing feature midway through the sprint. You must protect the release while responding professionally.

## Just-in-time field notes

- Authentication answers “who are you?” Authorization answers “may you do this?” A logged-in user is not automatically allowed to read every row.
- Enforce authorization in the database or server boundary, not by hiding buttons.
- Multi-tenant systems need an explicit ownership model. Every request must resolve the actor, resource, action, and tenant/owner relationship.
- Private storage uses policies and short-lived signed access. A hard-to-guess public URL is not access control.

## Work

Add sign-in, onboarding, ownership or organization membership, role-specific navigation, protected routes, private storage if the idea needs files, and useful account states. Implement search/filtering only after permissions are correct.

Respond to the change request with impact on schema, authorization, UX, tests, estimate, and launch. Accept, defer, split, or reject it explicitly.

Test an access matrix covering anonymous, user A, user B, privileged role, missing resource, direct URL, server action, database query, and storage access.

## Comprehension gate

- Trace identity from session to server/database policy.
- Explain why hiding a UI element is insufficient authorization.
- Add a role-limited action without regenerating the feature.
- Fix the seeded cross-tenant storage exposure.

## Mentor review

The mentor reviews the authorization model, access matrix, migration quality, product UX, change-control response, and your live code explanation.

## Done when

Cross-user tests fail closed, direct URLs do not bypass access, storage is private, privileged credentials stay server-side, the change decision is documented, and the mentor approves the architecture.
