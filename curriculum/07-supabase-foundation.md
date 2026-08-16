# Milestone 7 — Next.js + Supabase Product Foundation

**Timebox:** 16 hours
**Outcome:** one database-centered idea has a reproducible, secure end-to-end workflow.

## Agency assignment

Choose the database-oriented idea from milestone 0. The first release must solve one complete user problem; it is not permission to build every table imagined in the backlog.

## Just-in-time field notes

- A table represents one kind of entity. A row is one record; a column is one fact with a type.
- A primary key identifies a row. A foreign key represents a relationship and prevents references to missing records.
- CRUD means create, read, update, and delete. Product behavior usually needs validation and permissions around every operation.
- A migration is a versioned database change. Seed data creates a safe, repeatable development state.
- Supabase's anon key is designed to be used by clients; Row Level Security is what restricts accessible rows. The service-role key bypasses RLS and must remain server-only.

## Work

Write the user journey, ER diagram, data dictionary, threat model, and minimum schema. Install Supabase CLI as a pinned dev dependency in the Next.js project, initialize it through `npx supabase`, and add its commands to `docs/TOOLS.md` so Codex can inspect local/linked state safely. Store schema, RLS policies, and seed data as migrations; prove a local reset reproduces the environment.

Implement one vertical workflow with runtime validation and clear UI states. Write tests for anonymous, owner, and different-user behavior before calling the milestone complete.

## Comprehension gate

- Explain each table and relationship without reading generated prose.
- Trace a create action from form to validation, database row, RLS decision, and refreshed UI.
- Add one constrained field through a migration and update the UI manually.
- Fix the seeded overly broad select policy.

## Done when

A new developer can clone, reset, seed, and run the project from documentation; database changes exist in Git; RLS is enabled with tested policies; and no service-role credential reaches the browser.
