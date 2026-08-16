# Milestone 9 — Integrations and AI

**Timebox:** 16 hours
**Outcome:** one reliable third-party integration and one bounded AI capability with measurable value.

## Agency assignment

Stakeholders have proposed email, payments, automation, webhooks, and AI. Your job is not to add all of them. Select the smallest capabilities that improve the primary user workflow and document why the others are deferred.

## Visual map

```mermaid
flowchart LR
    EVENT["Provider event<br/>untrusted input"] --> SIG{"Valid signature<br/>and timestamp?"}
    SIG -->|"no"| REJECT["Reject + safe log"]
    SIG -->|"yes"| SCHEMA{"Valid event schema?"}
    SCHEMA -->|"no"| REJECT
    SCHEMA -->|"yes"| IDEM{"Event ID<br/>already processed?"}
    IDEM -->|"yes"| ACK["Acknowledge<br/>no duplicate effect"]
    IDEM -->|"no"| WORK["Bounded work<br/>retry-safe + budgeted"]
    WORK --> FALL["Structured result<br/>or deterministic fallback"]

    classDef context fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef decision fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef safe fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef risk fill:#fee2e2,stroke:#dc2626,color:#450a0a;
    class EVENT context;
    class SIG,SCHEMA,IDEM decision;
    class ACK,WORK,FALL safe;
    class REJECT risk;
```

Every external capability is untrusted and fallible. Signatures, validation, idempotency, budgets, evaluation, and fallbacks keep provider behavior from corrupting the core workflow.

## Just-in-time field notes

- Integrations introduce another system's identity, limits, failures, cost, and change schedule.
- A webhook is an incoming HTTP request. Verify its signature using the raw request as the provider documents, validate the event, make processing idempotent, and return promptly.
- Retry only operations that are safe to repeat or carry an idempotency key.
- AI output is untrusted external input. Prefer structured schemas, narrow context, explicit budgets, evaluations, and a deterministic fallback.
- Retrieval provides selected context; it does not grant truth. Prompt injection can arrive inside user content or retrieved documents.

## Work

Complete an integration decision record. Implement one email/webhook/payment/automation capability with server-only credentials, validation, failure logging, retry/idempotency behavior, and a local test strategy.

Implement one AI feature only if a non-AI baseline cannot meet the user need as well. Define an evaluation set with normal, edge, adversarial, and unavailable-provider cases. Log cost/latency without logging private prompt content.

## Comprehension gate

- Trace an integration event from provider to verified request, business action, database update, and user-visible result.
- Change one structured AI output field and its rendering manually.
- Fix the seeded duplicate-webhook processing bug.

## Done when

Provider failure does not corrupt core data, repeated events are safe, secrets remain server-only, AI has a budget and fallback, evaluation results are recorded, and the feature can be disabled without taking down the product.
