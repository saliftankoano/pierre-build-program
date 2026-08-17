# Fictional credential leak drill

This exercise practices a real incident response without ever creating, copying, or exposing a real credential.

Use only this unmistakably fictional training value when an assigned milestone tells you to activate the drill:

```dotenv
SYNTHETIC_API_KEY=SYNTHETIC_PIERRE_DRILL_NOT_A_REAL_CREDENTIAL_2026
```

The `SYNTHETIC_` prefix is the repository-wide machine-checkable marker. Never make a fake value resemble a GitHub, OpenAI, AWS, Slack, Supabase, Vercel, payment, or other provider credential. Never substitute an account value.

Treat the response process seriously:

1. Declare the fictional value compromised and identify every synthetic place that consumed it.
2. Replace it with a newly named fictional value and show that the old value fails the fixture check.
3. Inspect Git history, build artifacts, screenshots, issue text, and redacted logs for exposure.
4. Practice history cleanup only on the assigned disposable branch; do not rewrite a shared branch.
5. Redeploy or rerun the synthetic fixture and verify the replacement behavior.
6. Complete the incident report with timeline, impact, containment, recovery, and prevention.

The curriculum scanner allows clearly marked `SYNTHETIC_`, `EXAMPLE_`, `PLACEHOLDER`, and `YOUR_` assignments while continuing to reject realistic credential patterns.
