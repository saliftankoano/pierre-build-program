# Milestone 4 — Next.js Client Marketing Launch

**Timebox:** 14 hours
**Mentor gate:** required
**Outcome:** ClearPath is launched with a complete client handoff.

## Agency assignment

The client approved the visual direction but supplied revised service copy, a new service area, and a request that sounds small but affects scope. Maya expects you to distinguish launch-critical work from later enhancements, document the decision, and complete the site.

## Just-in-time field notes

- A form is a data boundary. Validate on the server even when the browser validates too.
- An API route receives an HTTP request and returns a response. Treat all request data as untrusted.
- Environment variables are configuration, not a place to bypass authorization. Values prefixed `NEXT_PUBLIC_` are shipped to the browser and are not secrets.
- SEO starts with useful content, accurate metadata, understandable URLs, semantic structure, and consistent business facts.
- Accessibility includes keyboard use, focus, labels, contrast, motion preferences, and understandable errors.

## Work

Complete the remaining ClearPath stories: service pages, service-area content, testimonials, FAQ, accessible navigation, quote form, Resend integration, metadata, sitemap/robots, analytics event plan, responsive QA, and launch checklist.

Use an `.env.example` containing names and explanations only. Configure different Vercel values for preview and production. Never put a real key in a PR, screenshot, issue, or chat.

When the change request arrives, respond with impact, recommendation, estimate, and whether it belongs in the current scope. Do not silently absorb work.

## Comprehension gate

- Trace a quote submission from fields through validation, server handler, email provider, response, and UI state.
- Explain which environment variables are public versus server-only and why.
- Add a service through the data/config layer without duplicating a page.
- Diagnose the seeded missing-environment-variable failure.

## Mentor review

The mentor scores client outcome, mobile UX, accessibility, code comprehension, form security, deployment, scope communication, and handoff. Address requested changes before acceptance.

## Done when

The production URL works, the client content is accurate, the form has a safe failure state, metadata is present, checks pass, analytics contains no sensitive form data, and the handoff explains content updates and credential ownership.
