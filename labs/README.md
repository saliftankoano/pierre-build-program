# Interactive build-and-incident labs

Every core milestone contains one professional lab. The lab is not a quiz and the seeded fault is not a trick: it is a controlled chance to predict, observe, diagnose, recover, and explain.

```mermaid
flowchart LR
    T["Ticket + diagram"] --> P["Predict layer + evidence"]
    P --> B["Build small behavior"]
    B --> I["Activate synthetic incident"]
    I --> D["Diagnose + disprove alternative"]
    D --> R["Repair + regression check"]
    R --> C["Codex defense + postmortem"]

    classDef context fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef action fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef incident fill:#fee2e2,stroke:#dc2626,color:#450a0a;
    classDef proof fill:#ede9fe,stroke:#7c3aed,color:#2e1065;
    class T,P context;
    class B,R action;
    class I,D incident;
    class C proof;
```

## Commands

```bash
npm run lab -- LAB-00
npm run lab:test -- LAB-00
npm run lab:hint -- LAB-00 1
```

Replace `OWNER` in a sandbox link with the GitHub account that owns your fork. StackBlitz is primary; use CodeSandbox only when browser or WebContainer compatibility blocks the primary lab. Local execution remains available after milestone 1.

The upstream starter passes its normal-state test and intentionally fails its incident challenge. Once `evidence/labs/LAB-XX.md` exists in your fork, lab CI requires your recovery test to pass.

## Safety boundary

- Browser labs use synthetic fixtures and only the visibly fictional value defined by the [credential leak drill](../resources/secret-leak-drill.md).
- Do not paste real tokens, cookies, headers, client data, forensic evidence, or employer information.
- No lab requires Docker, a native database server, a paid API, or personal infrastructure.
- Milestone 7 uses the real Supabase local-development workflow in the AtlasOps project, outside the browser lab. A documented hosted-development ADR is the fallback when Docker cannot run.
- The lab reset command prints scoped recovery guidance. Review the diff before restoring any file.

## Evidence

Copy [the lab evidence template](../templates/lab-evidence.md) to `evidence/labs/LAB-XX.md`. CI validates structure and deterministic behavior; Codex and mentor review the explanation and operational reasoning.
