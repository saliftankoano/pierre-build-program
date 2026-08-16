import { readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

export const root = path.resolve(new URL("..", import.meta.url).pathname);

export async function packets() {
  const directory = path.join(root, "agency", "packets");
  const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  return Promise.all(names.map(async (name) => JSON.parse(await readFile(path.join(directory, name), "utf8"))));
}

export function repoFromArgs(args) {
  const index = args.indexOf("--repo");
  const value = index >= 0 ? args[index + 1] : process.env.GITHUB_REPOSITORY;
  if (!value || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value)) {
    throw new Error("Provide --repo OWNER/REPOSITORY (or set GITHUB_REPOSITORY).");
  }
  return value;
}

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: options.cwd ?? root, encoding: "utf8", stdio: options.capture ? "pipe" : "inherit" });
  if (result.status !== 0) {
    const detail = options.capture ? `\n${result.stderr || result.stdout}` : "";
    throw new Error(`${command} ${args.join(" ")} failed.${detail}`);
  }
  return result.stdout?.trim();
}

export function issueBody(story, packet) {
  const list = (items) => items.map((item) => `- ${item}`).join("\n");
  const bugContract = story.type === "bug" ? `
## Bug report contract

- Environment: use the story's target local/preview/production environment and record URL, commit, browser/device, and role.
- Severity: ${story.priority} (confirm user/security impact before changing it).
- Reproduction: reproduce the behavior described in Context with safe or synthetic data and record exact steps.
- Expected: ${story.outcome}
- Actual: ${story.context}
- Screenshots/logs: attach redacted evidence identified below.
- Regression: add a check that fails before the fix and passes afterward; cover the stated acceptance criteria.
` : "";
  const spikeContract = story.type === "spike" ? `
## Spike contract

- Decision question: ${story.title} — ${story.outcome}
- Timebox: stay within this milestone's ${packet.hours}-hour budget and declare a smaller limit before researching.
- Alternatives: compare at least two viable options plus the simplest baseline, unless the acceptance criteria require more.
- Required record: capture the recommendation, evidence, rejected alternatives, consequences, and reversal trigger in an ADR or linked decision record.
` : "";
  return `# ${story.id}: ${story.title}

**Milestone:** ${packet.milestone} — ${packet.title}
**Type / priority / epic:** ${story.type} / ${story.priority} / ${story.epic}
**Persona:** ${story.persona}

## Desired outcome

${story.outcome}

## Context

${story.context}
${bugContract}${spikeContract}

## Acceptance criteria

${list(story.acceptanceCriteria.map((item) => `[ ] ${item}`))}

## Data/API contract

${story.dataContract || "None for this story."}

## Expectations

- Security: ${story.expectations.security}
- Privacy: ${story.expectations.privacy}
- Accessibility: ${story.expectations.accessibility}
- Analytics: ${story.expectations.analytics}

## Dependencies

${list(story.dependencies.length ? story.dependencies : ["None"])}

## Explicit non-goals

${list(story.nonGoals)}

## Definition of Done

${list(story.definitionOfDone.map((item) => `[ ] ${item}`))}

## Evidence required

${list(story.evidence.map((item) => `[ ] ${item}`))}

## Just-in-time concepts

${list(story.concepts)}
${story.seededBug ? `\n## Seeded bug\n\n${story.seededBug}\n` : ""}
## References

${story.designRefs?.length ? list(story.designRefs) : "- No additional reference supplied."}

---
Do not begin by asking Codex to implement everything. Inspect → clarify → define acceptance → plan → implement one story → check → inspect diff → explain → commit.`;
}
