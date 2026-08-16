# Ship With AI

**A project-based, agency-style curriculum for learning to ship useful software with AI.**

Ship With AI is for a technically fluent beginner who recognizes programming ideas such as loops and variables, but may not yet have a GitHub account or know how a repository reaches their computer. It does not begin with months of syntax drills. You join a fictional agency, receive client work as GitHub issues, use Codex as your first coding environment, and learn each concept while shipping Next.js projects.

By graduation, you should be able to turn an idea into requirements, give an AI useful context, inspect and debug its output, choose APIs and services responsibly, model a Supabase database, protect credentials, deploy on Vercel, and hand a project to a client.

> [!IMPORTANT]
> AI writes quickly; you remain responsible for the result. Never paste real secrets, private client data, or unapproved company code into an AI tool. Never run a command you do not understand well enough to explain its intended effect.

## How the agency works

You are the developer/product builder at **Ship With AI Studio**. Fictional teammates provide the context normally supplied inside an agency:

- **Maya Chen, account manager** — client goals, schedules, approvals, and scope.
- **Jon Bell, product designer** — user flows, responsive behavior, assets, and UI feedback.
- **Priya Raman, senior engineer** — architecture constraints and code-review questions.
- **Marcus Green, security reviewer** — authorization, secrets, data handling, and incident drills.
- **Elena Torres, QA analyst** — reproducible bugs and release findings.

Work arrives in progressive sprint packets. Each accepted milestone PR releases the next packet as GitHub issues. Later tickets deliberately include ambiguity, incomplete assets, conflicting feedback, and changes in scope. Your job includes asking good questions and documenting decisions.

## The 178-hour path

| Milestone | Hours | Shipped outcome |
| --- | ---: | --- |
| [0. GitHub and agency foundations](curriculum/00-agency-onboarding.md) | 8 | Account creation, repository concepts, first fork/clone/branch/PR, and idea inventory |
| [1. Codex developer cockpit](curriculum/01-codex-developer-cockpit.md) | 8 | Codex setup, project instructions, learning prompts, GitHub/Vercel tooling, and debugging context |
| [2. Agent planning and UI discovery](curriculum/02-agent-planning-and-ui-discovery.md) | 12 | Codex-assisted research, frontend vocabulary, component-source audit, and decision-complete plan |
| [3. First Next.js vertical slice](curriculum/03-first-vertical-slice.md) | 12 | One responsive, production-quality client page section using the selected design system |
| [4. Client marketing launch](curriculum/04-client-marketing-launch.md) | 14 | Complete ClearPath Home Services website on Vercel |
| [5. API research spike](curriculum/05-api-research-spike.md) | 12 | Evidence-backed API and tool decision for one real idea |
| [6. Next.js API data product](curriculum/06-api-data-product.md) | 16 | Deployed dashboard with resilient server-side API behavior |
| [7. Next.js + Supabase foundation](curriculum/07-supabase-foundation.md) | 16 | Database-backed workflow, migrations, seed data, and RLS |
| [8. Authenticated Next.js product](curriculum/08-authenticated-product.md) | 18 | User ownership, roles, protected storage, and authorization tests |
| [9. Integrations and AI](curriculum/09-integrations-and-ai.md) | 16 | One justified external integration and one bounded AI capability |
| [10. Production hardening](curriculum/10-production-hardening.md) | 14 | QA, security, observability, rollback, handoff, and maintenance |
| [11. Forensics capstone](curriculum/11-forensics-capstone.md) | 32 | Northstar Digital Forensics portal delivered as a client engagement |

Mentor reviews happen after milestones 4, 8, 10, and 11. All other work is driven day to day with Codex.

## Start here

1. Read [Getting Started](GETTING_STARTED.md). It begins before you have a GitHub account.
2. Complete milestone 0 in order: create and secure the account, learn why repositories/forks/clones exist, then create your first fork.
3. Complete milestone 1 to install and configure Codex, GitHub CLI, Node, and Vercel CLI.
4. From your cloned fork, run `npm install`, `npm run validate`, preview the issue release with `npm run agency:bootstrap -- --repo YOUR_HANDLE/ship-with-ai`, then create the milestone 0 issues with the same command plus `--apply`.
5. Complete milestone 2 as planning only, then start the first paid-project-style Next.js implementation from its approved plan.

Actual application code belongs in separate repositories. Create each one with:

```bash
npm run project:new -- my-project-name
```

## Codex first

Codex is the only AI coding environment used in the core path. Claude, Cursor, Copilot, v0, and other tools are acknowledged in the resource map, but there are no required exercises for them. Learning one environment deeply makes the durable habits—context, constraints, tool access, review, testing, and debugging—portable later.

When you do not understand something, do not ask Codex only to “fix it.” Ask it to teach the concept in the context of the current Next.js story, identify the exact file and runtime involved, link the primary documentation, predict what will happen, and then verify the prediction with you.

## The non-negotiable Codex loop

For every story:

1. Inspect the supplied brief, story, assets, and existing code.
2. Ask questions about material ambiguity.
3. Restate acceptance criteria and non-goals.
4. Ask Codex for a small implementation plan and the primary docs it used.
5. Implement one story, not the entire product.
6. Run checks and test the actual behavior.
7. Read the diff and ask Codex to explain unfamiliar code in the context of this Next.js app.
8. Make one controlled change yourself.
9. Commit with the story ID and open a PR.

Every milestone also requires you to explain, trace, modify, and debug generated code. A working page that you cannot reason about is not complete.

## Repository map

- `curriculum/` — the twelve milestone guides and just-in-time field notes.
- `agency/` — client briefs, sprint packets, story data, design handoffs, and scenario events.
- `templates/` — the documents used to run and deliver professional projects.
- `case-studies/` — pinned, annotated readings from Salif's public projects.
- `resources/` — official documentation and a dated creator/tool watchlist.
- `schemas/` and `scripts/` — validation, progressive issue release, and project creation.

## Educational and safety boundary

The Northstar project uses synthetic data. It is not court-grade chain-of-custody software, a compliance-certified evidence system, or legal advice. Do not upload real forensic evidence, client data, credentials, protected health information, or confidential employer information.

## License

Ship With AI is released under the [MIT License](LICENSE). Linked case-study repositories retain their own licenses; links and critique do not grant permission to copy unlicensed code.
