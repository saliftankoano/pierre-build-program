# Public project case studies

These links point to exact public commits owned by `saliftankoano`, so the reading does not silently change. They are annotated prompts, not code sources. A public repository without an explicit license is visible for study but does not grant permission to copy, modify, or redistribute its code.

For each study, first write your own architecture guess from the README and file tree. Then ask Codex to inspect the pinned commit, correct the guess with evidence, and connect one lesson to the current story.

| Project | Pinned commit | Curriculum lens |
| --- | --- | --- |
| [OpenSourceWorkshop](https://github.com/saliftankoano/OpenSourceWorkshop/tree/e5972441ce81f0f1e5f3b791a5afe37411df11c9) | `e597244` | Forks, issues, PRs, and reviews |
| [getgonejunk](https://github.com/saliftankoano/getgonejunk/tree/b12f715385b926181efd2f70c3810bd45a79b2a0) | `b12f715` | Agency delivery, conversion UX, SEO, forms, Resend, environment config |
| [aplus-prep](https://github.com/saliftankoano/aplus-prep/tree/b724cea7e140521378449640d674a2d99cfcb539) | `b724cea` | Structured data, ingestion, validation, compatibility |
| [portfolio](https://github.com/saliftankoano/portfolio/tree/708cbe0dd18205af3ae279ad7ef4d632db7ff308) | `708cbe0` | UI polish, content architecture, communicating work |
| [roogo-web](https://github.com/saliftankoano/roogo-web/tree/5947fde6d302fb5ee53ce93946e34b86335ab737) | `5947fde` | Auth, Supabase/integration inventory, attack surface |
| [sb-cli](https://github.com/saliftankoano/sb-cli/tree/e2c3abf145c88c0d3da7ac1f188108e1f4a4532c) | `e2c3abf` | Git automation, CLI design, configuration, packaging |
| [repotalk](https://github.com/saliftankoano/repotalk/tree/1a889649fdd89e03c493328ce03193b18429c195) | `1a88964` | GitHub APIs, RAG/MCP, dependency and security review |
| [deepshit](https://github.com/saliftankoano/deepshit/tree/7414e41b4da74c85a70cee35d9f2ab4c2c0b8396) | `7414e41` | GitHub APIs, RAG/MCP, dependency and security review |
| [sproutml](https://github.com/saliftankoano/sproutml/tree/b23a0e8cbd12e62f3e357d621e65107be441e09e) | `b23a0e8` | Frontend/backend boundaries and async AI work |
| [sproutml-agents](https://github.com/saliftankoano/sproutml-agents/tree/b7dc0c4fcf590ec13cbc27a0313e3e0d780ec446) | `b7dc0c4` | Python APIs, jobs, and agent orchestration |

## Critique questions

- What user and business outcome can you infer, and what evidence is missing?
- Where are browser, server, database, external-service, and deployment boundaries?
- Which files give an AI agent useful context? Which decisions are implicit?
- What data and secrets exist, and what is the likely attack surface?
- What would you preserve, simplify, test, or document before client handoff?
- Which lesson applies to today's story—and which pattern should not be copied into it?
