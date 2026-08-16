# Milestone 6 — Next.js API Data Product

**Timebox:** 16 hours
**Outcome:** a deployed, resilient dashboard powered by the API selected in milestone 5.

## Agency assignment

The spike was accepted. Jon has supplied a user flow, Priya has constrained the first release to one valuable workflow, and QA will test slow, empty, malformed, and rate-limited responses.

## Just-in-time field notes

- `async` work finishes later; `await` pauses the current function without making the network instant.
- Types describe the shape you expect. Runtime validation checks the untrusted response you actually received.
- Server fetching protects credentials and can control caching. Client state powers interactions after rendering.
- Loading, empty, partial, stale, and error are product states, not afterthoughts.
- Cache duration should follow how quickly the underlying truth changes and what stale data would cost the user.

## Work

Create a separate project repository. Implement only the accepted workflow: server-side API adapter, runtime validation, normalized internal type, dashboard UI, filters or pagination, refresh/freshness display, and useful failure states. Keep provider-specific shapes behind the adapter.

Add tests using recorded synthetic fixtures for success, empty result, malformed data, authorization failure, rate limiting, timeout, and provider outage. Do not call a paid API in unit tests.

## Comprehension gate

- Trace a user query through URL state, server request, API adapter, validation, normalization, and rendered result.
- Add a field to the normalized model and UI manually.
- Fix the supplied bug where a failed request is cached as successful data.

## Done when

The Vercel deployment has separate configuration, no browser-visible secret, observable freshness, documented limits, accessible states, tests for the adapter contract, and a fallback message that tells the user what to do next.
