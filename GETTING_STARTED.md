# Getting Started

## Start even if you have no accounts yet

You can read this public repository without signing in. Milestone 0 walks you through creating a GitHub account, verifying the email address, enabling two-factor authentication, understanding why the agency uses GitHub, and making your first fork. Do not skip those explanations merely because a mentor could click the buttons for you.

Use GitHub's official guides for [creating an account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) and [getting started with an account](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account). Record what each action accomplishes in your own words.

## What you will install

- A secured GitHub account, Git, and GitHub CLI (`gh`).
- Node.js 24 LTS and npm for Next.js projects.
- Codex as the only AI coding environment used in the core curriculum.
- Vercel CLI so Codex can link projects, deploy previews, inspect build failures, and read runtime logs from the repository context.
- Free accounts on Vercel and Supabase before their respective milestones.
- A password manager for credentials. Never keep real credentials in lesson notes.

Confirm your setup:

```bash
git --version
gh auth status
node --version
npm --version
```

## Why fork and clone?

The canonical `saliftankoano/ship-with-ai` repository is the curriculum source. A **fork** is your GitHub-owned copy: you can create branches, issues, PRs, and progress without changing the canonical course. A **clone** is the working copy downloaded to your computer so Codex and local tools can inspect and change files. A **push** sends your local commits back to your GitHub fork.

GitHub's [forking and cloning explanation](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop) is required milestone 0 reading.

## Create your agency workspace after milestones 0–1 setup

Fork this repository rather than editing the canonical curriculum. Your fork keeps its own issues, pull requests, Actions, and progress while retaining an upstream relationship for curriculum updates.

```bash
gh repo fork saliftankoano/ship-with-ai --clone
cd ship-with-ai
npm install
npm run validate
npm run agency:bootstrap -- --repo YOUR_HANDLE/ship-with-ai
npm run agency:bootstrap -- --repo YOUR_HANDLE/ship-with-ai --apply
```

The first bootstrap command is a dry run; read its output before using `--apply`. Invite your mentor as a collaborator on your fork. In repository **Settings → Actions → General → Workflow permissions**, allow GitHub Actions to create issues. Keep your application repositories separate from this curriculum fork. If a command is unfamiliar, ask Codex what it will read or change before running it.

## Work one issue at a time

1. Assign the issue to yourself.
2. Move it to `in progress` with a comment.
3. Create a branch: `git switch -c story/SWAI-001-short-name`.
4. Give Codex the issue, relevant client documents, and current repository context.
5. Commit small, coherent changes using the story ID.
6. Push and open a PR using the supplied template.
7. Complete the evidence and comprehension sections.
8. Merge only after checks and required review pass.

Use `npm run agency:next -- --repo OWNER/REPO --milestone 0` to preview what the progressive release automation will open next.

## When you are stuck

Do not send an AI only “it does not work.” Supply a debugging packet:

- What you expected.
- What actually happened.
- Exact reproduction steps.
- The full error message.
- Relevant logs with secrets removed.
- Files or functions involved.
- What you already tried and what changed.

After 30 focused minutes, open the blocker issue form. Being blocked is normal; hiding uncertainty is expensive.

## Definition of ready for a story

Before coding, you can identify the user, outcome, acceptance criteria, dependencies, design references, security constraints, and non-goals. If a missing answer could materially change the solution, ask before implementation.

## Definition of done for a story

- Acceptance criteria demonstrated.
- Lint, type checking, tests, and build pass where applicable.
- Loading, empty, error, mobile, and keyboard behavior considered.
- No secrets or private data in code, logs, screenshots, or commits.
- PR explains the change, evidence, limitations, and rollback.
- You can explain the important code in plain language.
