# Pierre Build Program

**A visual, agency-style path from “I understand what a loop is” to shipping professional Next.js products with Codex.**

Pierre does not need to wait until he can write an application from memory. He begins with complete projects, learns each concept when the work requires it, and remains responsible for understanding, testing, securing, and communicating what Codex helps create.

> [!IMPORTANT]
> AI writes quickly; the product builder owns the result. Never paste real secrets, private client data, forensic evidence, or unapproved employer code into an AI tool. Never run a command you cannot explain well enough to predict what it will affect.

## Built around Pierre’s existing strengths

Pierre is an application-construction beginner with substantial technical experience: nine years in hyperscale data-center operations, CCNA/CCNP knowledge, graduate cybersecurity and digital-forensics education, Scrum practice, and mature troubleshooting instincts. The public profile is deliberately employer-neutral and forbids confidential operational detail.

```mermaid
flowchart LR
    A["EXISTING STRENGTHS<br/>operations · networking<br/>security · Scrum"] --> B["CONCEPT BRIDGES<br/>packets → HTTP<br/>ACLs → RLS<br/>change windows → PRs"]
    B --> C["NEXT.JS PRODUCT WORK<br/>plan · build · test<br/>deploy · explain"]
    C --> D["GAME DAYS<br/>observe · diagnose<br/>contain · recover"]
    D --> E["PORTFOLIO<br/>ClearPath · AtlasOps<br/>Northstar"]

    classDef known fill:#0f766e,stroke:#134e4a,color:#ffffff;
    classDef learn fill:#2563eb,stroke:#1e3a8a,color:#ffffff;
    classDef verify fill:#7c3aed,stroke:#4c1d95,color:#ffffff;
    classDef outcome fill:#ea580c,stroke:#9a3412,color:#ffffff;
    class A known;
    class B,C learn;
    class D verify;
    class E outcome;
```

Read the sanitized [learner profile](learner-profile.yml) and [network-to-web bridge guide](resources/network-to-web-bridges.md). Every analogy states where it breaks; networking vocabulary is a starting hypothesis, not a substitute for application evidence.

## The transformation

```mermaid
flowchart LR
    A["START<br/>Ideas + technical curiosity<br/>Loops make sense<br/>Apps do not yet"]
    B["FOUNDATION<br/>GitHub identity<br/>Codex cockpit<br/>Planning vocabulary"]
    C["BUILD<br/>Next.js interfaces<br/>APIs<br/>Supabase products"]
    D["PROTECT<br/>Auth + RLS<br/>Secrets<br/>Testing + recovery"]
    E["SHIP<br/>Client demos<br/>Vercel production<br/>Handoff + support"]
    F["GRADUATE<br/>Independent AI<br/>product builder"]

    A -->|"learn by doing"| B
    B -->|"approved plan"| C
    C -->|"working product"| D
    D -->|"release evidence"| E
    E -->|"mentor defense"| F

    classDef start fill:#dbeafe,stroke:#2563eb,color:#172554,stroke-width:2px;
    classDef plan fill:#fef3c7,stroke:#d97706,color:#451a03,stroke-width:2px;
    classDef build fill:#dcfce7,stroke:#16a34a,color:#052e16,stroke-width:2px;
    classDef protect fill:#fee2e2,stroke:#dc2626,color:#450a0a,stroke-width:2px;
    classDef ship fill:#ede9fe,stroke:#7c3aed,color:#2e1065,stroke-width:2px;
    class A start;
    class B plan;
    class C build;
    class D protect;
    class E,F ship;
```

**Color key:** blue = starting context · amber = planning · green = building · red = risk/security · purple = delivery and graduation.

## How to start—even without a GitHub account

```mermaid
flowchart TD
    A["1 · Create GitHub account<br/>professional identity"]
    B["2 · Verify email + enable 2FA<br/>protect ownership"]
    C["3 · Complete GitHub Hello World<br/>practice in the browser"]
    D["4 · Fork this repository<br/>your GitHub-owned curriculum copy"]
    E["5 · Enable Actions in the fork<br/>review requested permissions"]
    F["6 · Run Start Pierre Build Program<br/>Mission Control + M0 issues"]
    G["7 · Open LAB-00<br/>ship a Next.js browser change"]
    H["8 · Install local Codex tools<br/>begin milestone 1"]

    A --> B --> C --> D --> E --> F --> G --> H

    classDef account fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef github fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef local fill:#dcfce7,stroke:#16a34a,color:#052e16;
    class A,B account;
    class C,D github;
    class E,F,G github;
    class H local;
```

Start with [Getting Started](GETTING_STARTED.md). It explains why each object exists before asking Pierre to use it. The canonical repository is the course; a **fork** is Pierre’s GitHub-owned workbook; a **clone** is the copy on his computer; a **branch** isolates one assignment; a **pull request** is the review packet.

After forking, open **Actions → Start Pierre Build Program → Run workflow**. The idempotent workflow creates milestone 0 and a living Mission Control issue before any local CLI is installed. Review the workflow permissions before enabling it.

After milestone 0, the equivalent local bootstrap remains available:

```bash
gh repo fork saliftankoano/pierre-build-program --clone
cd pierre-build-program
npm install
npm run validate
npm run agency:bootstrap -- --repo YOUR_HANDLE/pierre-build-program
npm run agency:bootstrap -- --repo YOUR_HANDLE/pierre-build-program --apply
```

The first bootstrap command is a safe preview. `--apply` creates the milestone 0 issues after Pierre reviews what will happen.

## The simulated agency

Pierre works as the developer/product builder at **Pierre Build Studio**. The fictional team supplies the information and pressure a real agency would provide.

```mermaid
flowchart TB
    P["PIERRE<br/>Developer + product builder<br/>Owns decisions and evidence"]
    M["Maya · Account manager<br/>Goals · timeline · scope · approvals"]
    J["Jon · Product designer<br/>Journeys · wireframes · UI critique"]
    R["Priya · Senior engineer<br/>Architecture · code review · tradeoffs"]
    S["Marcus · Security reviewer<br/>Authorization · secrets · incidents"]
    Q["Elena · QA analyst<br/>Reproduction · accessibility · regressions"]
    C["Fictional client<br/>Needs · feedback · changes · acceptance"]

    C -->|"brief + business outcome"| M
    M -->|"epics + stories"| P
    J -->|"visual intent + states"| P
    R -->|"constraints + review"| P
    S -->|"threats + findings"| P
    Q -->|"bugs + release evidence"| P
    P -->|"questions + demos + tradeoffs"| C

    classDef learner fill:#ede9fe,stroke:#7c3aed,color:#2e1065,stroke-width:3px;
    classDef product fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef design fill:#fae8ff,stroke:#c026d3,color:#4a044e;
    classDef engineering fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef security fill:#fee2e2,stroke:#dc2626,color:#450a0a;
    classDef qa fill:#fef3c7,stroke:#d97706,color:#451a03;
    class P learner;
    class M,C product;
    class J design;
    class R engineering;
    class S security;
    class Q qa;
```

Later tickets intentionally contain ambiguity, missing assets, conflicting feedback, security findings, and scope changes. Pierre must ask useful questions, label assumptions, identify non-goals, and present tradeoffs instead of letting Codex guess.

## The 178-hour project path

```mermaid
flowchart LR
    subgraph FOUNDATION["FOUNDATION · 28 hours"]
      M0["M0 · 8h<br/>GitHub + agency"]
      M1["M1 · 8h<br/>Codex cockpit"]
      M2["M2 · 12h<br/>Planning + UI discovery<br/>NO PRODUCTION CODE"]
      M0 --> M1 --> M2
    end

    subgraph FIRSTCLIENT["FIRST CLIENT · 26 hours"]
      M3["M3 · 12h<br/>Next.js vertical slice"]
      M4["M4 · 14h<br/>Marketing launch<br/>MENTOR GATE"]
      M3 --> M4
    end

    subgraph PRODUCTS["PRODUCT SYSTEMS · 62 hours"]
      M5["M5 · 12h<br/>AtlasOps API spike"]
      M6["M6 · 16h<br/>AtlasOps dashboard"]
      M7["M7 · 16h<br/>AtlasOps data foundation"]
      M8["M8 · 18h<br/>AtlasOps authentication<br/>MENTOR GATE"]
      M5 --> M6 --> M7 --> M8
    end

    subgraph DELIVERY["DELIVERY + CAPSTONE · 62 hours"]
      M9["M9 · 16h<br/>AtlasOps integrations + AI"]
      M10["M10 · 14h<br/>AtlasOps hardening<br/>MENTOR GATE"]
      M11["M11 · 32h<br/>Forensics capstone<br/>FINAL GATE"]
      M9 --> M10 --> M11
    end

    M2 -->|"approved plan"| M3
    M4 -->|"first client launch"| M5
    M8 -->|"secure product"| M9

    classDef foundation fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef build fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef data fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef ship fill:#ede9fe,stroke:#7c3aed,color:#2e1065;
    class M0,M1,M2 foundation;
    class M3,M4 build;
    class M5,M6,M7,M8 data;
    class M9,M10,M11 ship;
```

| Milestone | What Pierre visibly delivers |
| --- | --- |
| [0 · GitHub and agency foundations](curriculum/00-agency-onboarding.md) | Secured account, fork/clone/branch/PR practice, recovery exercise, ranked idea inventory |
| [1 · Codex developer cockpit](curriculum/01-codex-developer-cockpit.md) | Codex instructions, tool inventory, GitHub/Vercel diagnostics, safe permissions |
| [2 · Agent planning and UI discovery](curriculum/02-agent-planning-and-ui-discovery.md) | Decision-complete plan, frontend glossary, three visual directions, component audit |
| [3 · First Next.js vertical slice](curriculum/03-first-vertical-slice.md) | Responsive client section deployed to a Vercel preview |
| [4 · Client marketing launch](curriculum/04-client-marketing-launch.md) | Complete ClearPath website, production launch, client handoff |
| [5 · AtlasOps API research spike](curriculum/05-api-research-spike.md) | Tested comparison of service-health providers and an architecture decision |
| [6 · AtlasOps service-health dashboard](curriculum/06-api-data-product.md) | Resilient deployed dashboard with freshness and degraded states |
| [7 · AtlasOps Supabase foundation](curriculum/07-supabase-foundation.md) | Operations data model, migrations, synthetic seeds, CRUD, and RLS |
| [8 · Authenticated AtlasOps product](curriculum/08-authenticated-product.md) | Operator/lead/stakeholder roles and cross-tenant authorization tests |
| [9 · AtlasOps integrations and AI](curriculum/09-integrations-and-ai.md) | Signed webhook/notification and bounded handoff summary |
| [10 · AtlasOps hardening](curriculum/10-production-hardening.md) | Tests, observability, game day, rollback, and maintenance proposal |
| [11 · Forensics capstone](curriculum/11-forensics-capstone.md) | Northstar portal delivered from discovery through support handoff |

Mentor reviews occur after milestones 4, 8, 10, and 11. Codex handles daily teaching, story clarification, planning support, code explanation, research, and debugging practice.

## One professional lab in every milestone

```mermaid
flowchart LR
    T["TICKET<br/>brief + topology<br/>acceptance"] --> P["PREDICT<br/>layer + evidence"]
    P --> B["BUILD<br/>small behavior"]
    B --> I["INCIDENT<br/>synthetic fault"]
    I --> D["DIAGNOSE<br/>hypothesis + alternative"]
    D --> R["RECOVER<br/>focused repair + test"]
    R --> C["DEFEND<br/>trace + modification<br/>postmortem"]

    classDef context fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef action fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef incident fill:#fee2e2,stroke:#dc2626,color:#450a0a;
    classDef proof fill:#ede9fe,stroke:#7c3aed,color:#2e1065;
    class T,P context;
    class B,R action;
    class I,D incident;
    class C proof;
```

The [interactive lab system](labs/README.md) provides one core lab per milestone, StackBlitz-first browser packages for milestones 0–10, a preview-based Northstar defense, three progressive hints, deterministic checks, and structured evidence. Four additional three-hour exercises form the [optional CCNP operations track](labs/optional/README.md) outside the required 178 hours.

## AtlasOps — one evolving operations product

Milestones 5–10 build one portfolio product instead of six disconnected demos. [AtlasOps](agency/clients/atlasops/brief.md) begins as a service-health provider decision, grows into a Next.js dashboard and Supabase operations model, then adds organization roles, safe notifications, a bounded AI handoff summary, and production game-day evidence. It never connects to real employer systems, network devices, monitoring infrastructure, or incident data.

## How one story moves through the agency

```mermaid
flowchart LR
    I["ISSUE<br/>persona + outcome<br/>acceptance + non-goals"]
    C["CLARIFY<br/>facts vs assumptions<br/>material questions"]
    P["PLAN WITH CODEX<br/>small steps + docs<br/>risks + tests"]
    B["BUILD ONE STORY<br/>focused diff<br/>no scope creep"]
    V["VERIFY<br/>checks + browser<br/>security + accessibility"]
    E["EXPLAIN<br/>trace + modification<br/>seeded bug"]
    PR["PULL REQUEST<br/>preview + evidence<br/>limitations"]
    R["REVIEW<br/>client · mentor · QA<br/>merge or revise"]

    I --> C --> P --> B --> V --> E --> PR --> R
    R -. "changes requested" .-> B

    classDef input fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef thinking fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef action fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef proof fill:#ede9fe,stroke:#7c3aed,color:#2e1065;
    class I input;
    class C,P thinking;
    class B,V,E action;
    class PR,R proof;
```

Every released issue contains the user, business outcome, context, observable acceptance criteria, data/API contract, security/privacy/accessibility/analytics expectations, dependencies, explicit non-goals, Definition of Done, evidence, and just-in-time concepts. Bugs add reproduction and regression contracts; spikes add a question, timebox, alternatives, and decision record.

## Codex is the first and only required AI environment

```mermaid
flowchart TD
    U["PIERRE'S INTENT<br/>user · outcome · taste · constraints"]
    X["PROJECT CONTEXT<br/>AGENTS.md · product docs<br/>architecture · current story"]
    T["TOOLS + EVIDENCE<br/>GitHub CLI · Vercel CLI<br/>browser · logs · web/docs"]
    A["CODEX<br/>planning partner<br/>teacher · builder · debugger"]
    O["PROPOSED OUTPUT<br/>plan · code · diagnosis<br/>tradeoffs"]
    H["HUMAN DECISION<br/>inspect · test · explain<br/>accept · modify · reject"]

    U --> A
    X --> A
    T --> A
    A --> O --> H
    H -. "better constraints" .-> U
    H -. "missing context" .-> X
    H -. "need evidence" .-> T

    classDef human fill:#ede9fe,stroke:#7c3aed,color:#2e1065,stroke-width:2px;
    classDef context fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef agent fill:#fef3c7,stroke:#d97706,color:#451a03,stroke-width:2px;
    classDef output fill:#dcfce7,stroke:#16a34a,color:#052e16;
    class U,H human;
    class X,T context;
    class A agent;
    class O output;
```

Claude, Cursor, Copilot, v0, and other environments are acknowledged, but the core path does not switch between them. Pierre first learns durable habits—context, constraints, permissions, primary-document research, testing, diff review, and explanation—in Codex. Those habits transfer later.

When Pierre does not understand something, he should not ask only “fix it.” He asks Codex to:

1. Explain the concept through the current Next.js story and exact files.
2. Label what runs in the browser, Next.js server, database, build, or external service.
3. Find the current primary documentation and match it to the installed version.
4. Ask Pierre to predict what will happen before running the code.
5. Let Pierre explain it back and identify the specific gap.
6. Create the smallest test or experiment that proves the behavior.

## Planning comes before production code

Milestone 2 is deliberately **planning only**.

```mermaid
flowchart LR
    IDEA["RAW IDEA<br/>what Pierre imagines"]
    INTERVIEW["CODEX INTERVIEW<br/>one material question<br/>at a time"]
    MAP["UNDERSTANDING MAP<br/>facts · preferences<br/>assumptions · unknowns"]
    RESEARCH["CURRENT RESEARCH<br/>primary docs · cost<br/>security · failure"]
    OPTIONS["OPTIONS<br/>build · library<br/>service · defer"]
    DESIGN["VISUAL DIRECTIONS<br/>3 distinct systems<br/>terms + references"]
    STORIES["AGENCY PLAN<br/>epics · stories<br/>acceptance · evidence"]
    APPROVAL["DECISION GATE<br/>approve · spike · reject"]

    IDEA --> INTERVIEW --> MAP --> RESEARCH --> OPTIONS --> DESIGN --> STORIES --> APPROVAL
    APPROVAL -. "unresolved material risk" .-> RESEARCH

    classDef intent fill:#ede9fe,stroke:#7c3aed,color:#2e1065;
    classDef discover fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef decide fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef ready fill:#dcfce7,stroke:#16a34a,color:#052e16;
    class IDEA intent;
    class INTERVIEW,MAP,RESEARCH discover;
    class OPTIONS,DESIGN decide;
    class STORIES,APPROVAL ready;
```

Codex may know useful tools Pierre has never encountered and can research unfamiliar ones through web search. Pierre saves time by treating the agent as an informed partner, but he verifies recommendations through primary documentation, safe experiments, actual cost/limits, license, privacy, maintenance, and failure behavior.

## Learn the visual language before directing the frontend

```mermaid
flowchart TB
    GOAL["USER + BUSINESS GOAL"]
    WORDS["FRONTEND VOCABULARY<br/>hero · bento · dialog · sheet<br/>combobox · skeleton · toast"]
    SYSTEM["DESIGN SYSTEM<br/>type · color · spacing · radius<br/>shadow · icons · motion"]
    FOUNDATION["ONE FOUNDATION<br/>shadcn/ui · Radix<br/>Base UI · React Aria"]
    SPECIAL["0–2 SPECIALISTS<br/>Aceternity · Magic UI<br/>21st.dev · Motion"]
    STATES["COMPLETE STATES<br/>mobile · keyboard · focus<br/>loading · empty · error"]
    UI["COHERENT IMPLEMENTATION<br/>specific enough for Codex<br/>consistent enough for clients"]

    GOAL --> WORDS --> SYSTEM
    SYSTEM --> FOUNDATION
    SYSTEM --> SPECIAL
    FOUNDATION --> STATES
    SPECIAL --> STATES
    STATES --> UI

    classDef goal fill:#ede9fe,stroke:#7c3aed,color:#2e1065;
    classDef language fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef choice fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef result fill:#dcfce7,stroke:#16a34a,color:#052e16;
    class GOAL goal;
    class WORDS,SYSTEM language;
    class FOUNDATION,SPECIAL choice;
    class STATES,UI result;
```

Use the [UI Library Field Guide](resources/ui-library-field-guide.md) to explore live components visually. Choose one accessible foundation, then at most two specialist components with obvious story value. Every adopted component receives a source, license, version, dependency, accessibility, responsive, reduced-motion, and maintenance review.

## Understand where Next.js code actually runs

```mermaid
flowchart LR
    PERSON["USER<br/>clicks · types · reads"]
    BROWSER["BROWSER<br/>React UI<br/>interaction + local state"]
    SERVER["NEXT.JS SERVER<br/>validation · authorization<br/>server actions/routes"]
    DB["SUPABASE<br/>Postgres · Auth · Storage<br/>RLS at data boundary"]
    API["EXTERNAL SERVICES<br/>email · payment · APIs · AI"]
    VERCEL["VERCEL<br/>build · preview · production<br/>logs · rollback"]

    PERSON <-->|"accessible interface"| BROWSER
    BROWSER -->|"untrusted request"| SERVER
    SERVER -->|"authorized query"| DB
    SERVER -->|"server-only credential"| API
    VERCEL -. "deploys + observes" .-> BROWSER
    VERCEL -. "runs + logs" .-> SERVER

    classDef human fill:#ede9fe,stroke:#7c3aed,color:#2e1065;
    classDef client fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef server fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef sensitive fill:#fee2e2,stroke:#dc2626,color:#450a0a;
    classDef platform fill:#fef3c7,stroke:#d97706,color:#451a03;
    class PERSON human;
    class BROWSER client;
    class SERVER server;
    class DB,API sensitive;
    class VERCEL platform;
```

This boundary map appears repeatedly because it explains props, Client Components, API routes, validation, secrets, database policies, caching, logs, and deployment failures.

## Secrets: the boundary that cannot be guessed

```mermaid
flowchart TD
    VALUE["CREDENTIAL VALUE<br/>password manager/provider"]
    LOCAL["LOCAL<br/>.env.local<br/>ignored by Git"]
    PREVIEW["VERCEL PREVIEW<br/>separate scoped value"]
    PROD["VERCEL PRODUCTION<br/>separate scoped value"]
    SERVER["SERVER-ONLY CODE<br/>reads credential"]
    PUBLIC["BROWSER BUNDLE<br/>NEVER receives secret"]
    LEAK["FICTIONAL LEAK DRILL<br/>revoke → rotate → clean history<br/>redeploy → verify → report"]

    VALUE --> LOCAL --> SERVER
    VALUE --> PREVIEW --> SERVER
    VALUE --> PROD --> SERVER
    SERVER -->|"safe response only"| PUBLIC
    PUBLIC -. "blocked boundary" .-> VALUE
    VALUE -. "if exposed" .-> LEAK

    classDef secret fill:#fee2e2,stroke:#dc2626,color:#450a0a,stroke-width:2px;
    classDef env fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef safe fill:#dcfce7,stroke:#16a34a,color:#052e16;
    class VALUE,LEAK secret;
    class LOCAL,PREVIEW,PROD env;
    class SERVER,PUBLIC safe;
```

`.env.example` contains names and explanations only. A `NEXT_PUBLIC_` value is sent to the browser and therefore cannot be treated as secret. The leak drill uses fictional credentials but practices the real response: revocation, rotation, history/log review, redeployment, invalidation testing, and incident documentation.

## Progressive release and evidence gates

```mermaid
stateDiagram-v2
    [*] --> PacketReleased: milestone issues opened
    PacketReleased --> StoryInProgress: assign + branch
    StoryInProgress --> EvidenceReady: acceptance + checks + explanation
    EvidenceReady --> ChangesRequested: QA / mentor findings
    ChangesRequested --> StoryInProgress: revise with evidence
    EvidenceReady --> MilestoneAccepted: review approved
    MilestoneAccepted --> NextPacket: merge labeled PR
    NextPacket --> PacketReleased: automation opens next issues
    MilestoneAccepted --> [*]: after final capstone
```

Every milestone PR includes linked stories, acceptance evidence, working deployment URL, screenshots or recordings, automated checks, security and accessibility review, code explanation, a controlled modification, seeded-bug diagnosis, limitations, and retrospective.

## Graduation

```mermaid
flowchart TB
    E["ALL MILESTONE EVIDENCE"]
    D["WORKING PRODUCTION DEPLOYMENTS"]
    G4["MENTOR GATE · M4<br/>client launch"]
    G8["MENTOR GATE · M8<br/>authenticated product"]
    G10["MENTOR GATE · M10<br/>production readiness"]
    G11["FINAL GATE · M11<br/>capstone defense"]
    SCORE["≥ 3 OF 4 IN EVERY CATEGORY<br/>product · UI/UX · comprehension<br/>maintainability · security · testing<br/>deployment · incident diagnosis<br/>client communication"]
    BLOCK["NO CRITICAL AUTHORIZATION<br/>OR SECRET FAILURE"]
    GRAD["GRADUATE<br/>independent AI product builder"]

    E --> SCORE
    D --> SCORE
    G4 --> SCORE
    G8 --> SCORE
    G10 --> SCORE
    G11 --> SCORE
    SCORE --> BLOCK --> GRAD

    classDef evidence fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef gate fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef security fill:#fee2e2,stroke:#dc2626,color:#450a0a;
    classDef graduate fill:#ede9fe,stroke:#7c3aed,color:#2e1065,stroke-width:3px;
    class E,D evidence;
    class G4,G8,G10,G11,SCORE gate;
    class BLOCK security;
    class GRAD graduate;
```

Pierre must independently plan for Codex, clarify requirements, explain and modify generated code, debug from evidence, evaluate unfamiliar tools, model Supabase data and RLS, protect and rotate credentials, handle feedback, and deploy, roll back, document, and hand off a client application.

## Learn by taking a gander at real open-source products

```mermaid
flowchart LR
    SMALL["FOCUSED EXAMPLES<br/>SaaS Starter · Supabase<br/>shadcn/ui"]
    PRODUCT["COMPLETE PRODUCTS<br/>Vercel Commerce<br/>Documenso"]
    SYSTEM["LARGE SYSTEMS<br/>Sim · OpenStatus · Uptime Kuma<br/>NetBox · Trigger.dev · Cal.diy"]
    METHOD["STUDY METHOD<br/>look → map → trace<br/>challenge → adapt"]
    RESULT["RESULT<br/>one verified pattern<br/>not a copied architecture"]

    SMALL --> METHOD
    PRODUCT --> METHOD
    SYSTEM --> METHOD
    METHOD --> RESULT

    classDef context fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef plan fill:#fef3c7,stroke:#d97706,color:#451a03;
    classDef build fill:#dcfce7,stroke:#16a34a,color:#052e16;
    class SMALL,PRODUCT context;
    class SYSTEM plan;
    class METHOD,RESULT build;
```

The [open-source project learning lab](case-studies/open-source-projects.md) includes pinned, licensed examples chosen for a specific lesson:

- [Sim](https://github.com/simstudioai/sim) for Next.js AI workflow UX, visual graph editing, realtime systems, provider boundaries, background jobs, and environment contracts.
- Next.js SaaS Starter for a smaller full-stack application skeleton.
- shadcn/ui for accessible component source and design-system adaptation.
- Supabase's Next.js user-management example for browser/server clients, Auth, cookies, Storage, and RLS reasoning.
- Vercel Commerce for data providers, caching, storefront states, and responsive product UI.
- Documenso for role-aware document workflows, storage, email, and security boundaries.
- OpenStatus for APIs, monitoring, incidents, logs, analytics, and multi-service architecture.
- Uptime Kuma for monitoring product states, notifications, and incident UX.
- NetBox for operations data modeling, tenancy, relationships, and deliberate scope reduction.
- Trigger.dev for queues, retries, idempotency, long-running work, and observability.
- Cal.diy for scheduling, time zones, integration complexity, and scope discovery.

Each study starts with Pierre's own architecture guess, then uses Codex to correct it with exact file evidence. He traces one user action, challenges security and operational tradeoffs, and adapts one small pattern only when the current story needs it.

## Repository map

```mermaid
flowchart TD
    ROOT["pierre-build-program/"]
    ROOT --> CURR["curriculum/<br/>12 visual milestone guides"]
    ROOT --> AGENCY["agency/<br/>clients + progressive packets"]
    ROOT --> TEMPLATES["templates/<br/>agency delivery documents"]
    ROOT --> CASES["case-studies/<br/>pinned public-project critiques"]
    ROOT --> RES["resources/<br/>UI field guide + dated watchlist"]
    ROOT --> PLAY["playbooks/<br/>repeatable Codex workflows"]
    ROOT --> LABS["labs/<br/>12 contracts + browser game days"]
    ROOT --> EVIDENCE["evidence/<br/>learner lab defenses"]
    ROOT --> AUTO["schemas/ + scripts/ + .github/<br/>validation + issue automation"]

    classDef root fill:#ede9fe,stroke:#7c3aed,color:#2e1065,stroke-width:3px;
    classDef learn fill:#dbeafe,stroke:#2563eb,color:#172554;
    classDef work fill:#dcfce7,stroke:#16a34a,color:#052e16;
    classDef support fill:#fef3c7,stroke:#d97706,color:#451a03;
    class ROOT root;
    class CURR,PLAY learn;
    class AGENCY,TEMPLATES,LABS,EVIDENCE work;
    class CASES,RES,AUTO support;
```

Application code belongs in separate repositories. After planning approval, create one with:

```bash
npm run project:new -- my-project-name
```

The generator creates a strict TypeScript Next.js App Router project with Tailwind, Supabase, `.env.example`, durable Codex context, CI, Vitest, Playwright, and the standard `npm run check`, `npm test`, `npm run test:e2e`, and `npm run build` commands.

## Educational and safety boundary

The Northstar project uses synthetic data and safe sample files. It is educational software—not court-grade chain-of-custody software, compliance-certified evidence storage, evidence-integrity certification, legal advice, or a production forensic system.

## License

Pierre Build Program is released under the [MIT License](LICENSE). Linked case-study repositories retain their own licenses; links and critique do not grant permission to copy unlicensed code.
