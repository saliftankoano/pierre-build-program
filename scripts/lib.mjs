import { readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

export const root = path.resolve(new URL("..", import.meta.url).pathname);

export async function packets() {
  const directory = path.join(root, "agency", "packets");
  const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  const values = await Promise.all(names.map(async (name) => JSON.parse(await readFile(path.join(directory, name), "utf8"))));
  const labs = JSON.parse(await readFile(path.join(root, "labs", "catalog.json"), "utf8"));
  for (const packet of values) {
    const lab = labs.find((candidate) => candidate.milestone === packet.milestone && candidate.core);
    if (lab) packet.stories.push(labStory(lab, packet));
  }
  return values;
}

function labStory(lab, packet) {
  return {
    id: lab.storyId,
    type: "lab",
    priority: "P0",
    epic: "Interactive operations lab",
    title: lab.title,
    persona: "Developer on operational duty",
    outcome: `The milestone ${packet.milestone} capability is built, verified, diagnosed under failure, and explained with evidence.`,
    context: `${lab.buildBrief} After the normal behavior works, run the synthetic game day and recover without replacing the entire feature.`,
    acceptanceCriteria: lab.acceptanceTests,
    designRefs: [lab.sandboxUrl, lab.fallbackUrl],
    dataContract: "Synthetic fixtures only. The lab contract and evidence template define the observable inputs and outputs.",
    expectations: {
      security: "Use only supplied synthetic values; redact tokens, session data, and private logs.",
      privacy: "Do not use employer, client, forensic, or personally identifying data.",
      accessibility: "Keep the learner-facing status, failure, and recovery states keyboard accessible and understandable without color.",
      analytics: "Record only safe lab phase and check outcome; never record payload or credential values."
    },
    dependencies: packet.milestone === 0 ? [] : [`Milestone ${packet.milestone - 1} accepted`],
    nonGoals: ["Replacing the whole feature with regenerated code", "Using real credentials or production data", "Expanding beyond the stated incident"],
    definitionOfDone: ["Build behavior passes deterministic checks", "Seeded incident is reproduced and repaired", "Codex defense and postmortem are complete"],
    evidence: lab.evidence,
    concepts: [lab.bridge.knownConcept, lab.bridge.applicationConcept, "hypothesis", "blast radius", "rollback", "postmortem"],
    seededBug: lab.incidentBrief,
    labContract: lab
  };
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

export function issueBody(story, packet, repo) {
  const list = (items) => items.map((item) => `- ${item}`).join("\n");
  const owner = repo?.split("/")[0];
  const learnerLink = (value) => owner ? value.replaceAll("OWNER", owner) : value;
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
  const labContract = story.type === "lab" ? `
## Interactive lab contract

**Lab / delivery / timebox:** ${story.labContract.id} / ${story.labContract.delivery} / ${story.labContract.timeboxMinutes} minutes
**Starter:** \`${story.labContract.starterPath}\`
**Primary sandbox:** ${learnerLink(story.labContract.sandboxUrl)}
**Fallback:** ${learnerLink(story.labContract.fallbackUrl)}

### Concept bridge

- Known model: ${story.labContract.bridge.knownConcept}
- Application model: ${story.labContract.bridge.applicationConcept}
- Where the analogy breaks: ${story.labContract.bridge.analogyLimit}

### Build assignment

${story.labContract.buildBrief}

### Seeded game day

${story.labContract.incidentBrief}

- Activate: \`${story.labContract.scenario.activation}\`
- Observable symptoms: ${story.labContract.scenario.symptoms}
- Reset: \`${story.labContract.scenario.reset}\`

### Prediction questions

${list(story.labContract.predictionQuestions)}

### Deterministic checks

${list(story.labContract.acceptanceTests.map((item) => `[ ] ${item}`))}

### Codex defense

${list(story.labContract.defenseQuestions)}

### Progressive hints

1. ${story.labContract.hints[0]}
2. ${story.labContract.hints[1]}
3. ${story.labContract.hints[2]}
` : "";
  return `# ${story.id}: ${story.title}

**Milestone:** ${packet.milestone} — ${packet.title}
**Type / priority / epic:** ${story.type} / ${story.priority} / ${story.epic}
**Persona:** ${story.persona}

## Desired outcome

${story.outcome}

## Context

${story.context}
${bugContract}${spikeContract}${labContract}

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

${story.designRefs?.length ? list(story.designRefs.map(learnerLink)) : "- No additional reference supplied."}

---
Do not begin by asking Codex to implement everything. Inspect → clarify → define acceptance → plan → implement one story → check → inspect diff → explain → commit.`;
}
