import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { packets, issueBody, githubRepoFromRemote, learnerLink } from "../scripts/lib.mjs";
import { missionControlBody } from "../scripts/mission-control-lib.mjs";
import { evidenceErrors } from "../scripts/evidence-lib.mjs";
import { secretFindings } from "../scripts/secret-scanner-lib.mjs";
import { directAddressFindings } from "../scripts/language-lib.mjs";
import { closedMentorReview, hasMentorApproval, incompleteStoryIds } from "../scripts/release-readiness-lib.mjs";

test("packets form a 0–11 path totaling 178 hours", async () => {
  const values = await packets();
  assert.deepEqual(values.map((packet) => packet.milestone), [...Array(12).keys()]);
  assert.equal(values.reduce((sum, packet) => sum + packet.hours, 0), 178);
});

test("story IDs are unique", async () => {
  const values = await packets();
  const ids = values.flatMap((packet) => packet.stories.map((story) => story.id));
  assert.equal(new Set(ids).size, ids.length);
});

test("every milestone contains one core interactive lab", async () => {
  const values = await packets();
  for (const packet of values) {
    const labs = packet.stories.filter((story) => story.type === "lab");
    assert.equal(labs.length, 1, `milestone ${packet.milestone}`);
    assert.equal(labs[0].labContract.id, `LAB-${String(packet.milestone).padStart(2, "0")}`);
    assert.equal(labs[0].labContract.core, true);
    assert.equal(labs[0].labContract.hints.length, 3);
  }
});

test("released issue body preserves required agency interface", async () => {
  const [packet] = await packets();
  const body = issueBody(packet.stories[0], packet, "pierre/pierre-build-program");
  for (const heading of ["Acceptance criteria", "Data/API contract", "Expectations", "Dependencies", "Explicit non-goals", "Definition of Done", "Evidence required", "Just-in-time concepts"]) {
    assert.match(body, new RegExp(`## ${heading}`));
  }
  assert.match(body, /## Start with Codex/);
  assert.match(body, /github\.com\/pierre\/pierre-build-program\/blob\/main\/START_HERE\.md/);
  assert.doesNotMatch(body, /OWNER/);
});

test("lab issue body includes build, incident, verification, and defense contracts", async () => {
  const [packet] = await packets();
  const lab = packet.stories.find((story) => story.type === "lab");
  const body = issueBody(lab, packet);
  for (const heading of ["Interactive lab contract", "Build assignment", "Seeded game day", "Prediction questions", "Deterministic checks", "Codex defense", "Progressive hints"]) {
    assert.match(body, new RegExp(`##?#? ${heading}`));
  }
});

test("released lab links target the learner fork", async () => {
  const [packet] = await packets();
  const lab = packet.stories.find((story) => story.type === "lab");
  const body = issueBody(lab, packet, "pierre/pierre-build-program");
  assert.match(body, /stackblitz\.com\/github\/pierre\/pierre-build-program\/tree\/main/);
  assert.doesNotMatch(body, /OWNER/);
});

test("mission control derives released, blocked, evidence, and accepted states", async () => {
  const values = await packets();
  const issues = [
    { title: "[SWAI-001] Account", state: "CLOSED", labels: [{ name: "milestone-0" }] },
    { title: "[SWAI-002] Workflow", state: "OPEN", labels: [{ name: "milestone-0" }, { name: "blocked" }] },
    { title: "[SWAI-011] Codex", state: "CLOSED", labels: [{ name: "milestone-1" }] }
  ];
  const pullRequests = [{ title: "Milestone 1: Codex cockpit", mergedAt: "2026-01-01T00:00:00Z", labels: [{ name: "milestone-accepted" }] }];
  const body = missionControlBody(values, issues, pullRequests);
  assert.match(body, /M0.*blocked/);
  assert.match(body, /M1.*accepted/);
  assert.match(body, /Accepted core time:\*\* 8\/178 hours/);
  assert.match(body, /Resolve or escalate the blocked milestone 0/);
});

test("empty mission control begins with the web-first bootstrap", async () => {
  const body = missionControlBody(await packets(), [], [], "pierre/pierre-build-program");
  assert.match(body, /Run the Start Pierre Build Program workflow/);
  assert.match(body, /github\.com\/pierre\/pierre-build-program\/blob\/main\/START_HERE\.md/);
  assert.match(body, /learning-partner playbook/);
});

test("GitHub remotes produce fork-aware lab links without OWNER placeholders", () => {
  assert.equal(githubRepoFromRemote("git@github.com:pierre/pierre-build-program.git"), "pierre/pierre-build-program");
  assert.equal(githubRepoFromRemote("https://github.com/pierre/pierre-build-program.git"), "pierre/pierre-build-program");
  assert.match(learnerLink("https://stackblitz.com/github/OWNER/pierre-build-program", "pierre/pierre-build-program"), /github\/pierre\/pierre-build-program/);
  assert.doesNotMatch(learnerLink("https://stackblitz.com/github/OWNER/pierre-build-program"), /OWNER/);
});

test("completed lab evidence requires every comprehension and incident section", async () => {
  const template = (await readFile(new URL("../templates/lab-evidence.md", import.meta.url), "utf8")).replace("LAB-XX", "LAB-07");
  assert.deepEqual(evidenceErrors(template, "LAB-07"), []);
  assert.match(evidenceErrors("# LAB-07 evidence\n", "LAB-07").join("\n"), /missing section '## Codex defense'/);
});

test("secret scanner rejects realistic patterns and permits marked drill assignments", () => {
  const realisticAssignment = ["API", "_KEY=", "1234567890", "1234567890"].join("");
  const realisticGitHubToken = ["ghp", "_", "123456789012345", "678901234567890"].join("");
  assert.deepEqual(secretFindings(realisticAssignment), ["assigned secret"]);
  assert.deepEqual(secretFindings(realisticGitHubToken), ["GitHub token"]);
  assert.deepEqual(secretFindings("SYNTHETIC_API_KEY=SYNTHETIC_PIERRE_DRILL_NOT_A_REAL_CREDENTIAL_2026"), []);
  assert.deepEqual(secretFindings('SYNTHETIC_API_KEY="SYNTHETIC_PIERRE_DRILL_NOT_A_REAL_CREDENTIAL_2026"'), []);
  assert.deepEqual(secretFindings("API_KEY=EXAMPLE_NOT_A_REAL_CREDENTIAL_2026"), []);
});

test("learner-facing instructions address you directly", () => {
  assert.deepEqual(directAddressFindings("Pierre must finish the story. The learner submits evidence."), ["third-person Pierre instruction", "generic learner reference"]);
  assert.deepEqual(directAddressFindings("Pierre, this program is yours. You submit your evidence."), []);
});

test("milestone 0 is browser-first and milestone 1 owns local setup", async () => {
  const values = await packets();
  const onboarding = values[0];
  const browserStory = onboarding.stories.find((story) => story.id === "SWAI-002");
  const firstLab = onboarding.stories.find((story) => story.type === "lab").labContract;
  const cockpit = values[1].stories.find((story) => story.id === "SWAI-011");

  assert.match(browserStory.context, /Local Git and cloning begin in milestone 1/);
  assert.doesNotMatch(firstLab.scenario.reset, /git revert/);
  assert.ok(firstLab.instructions.length >= 4);
  assert.match(cockpit.context, /Install Git, clone your fork/);
  assert.match(cockpit.acceptanceCriteria.join(" "), /origin.*upstream/);
});

test("packet release refuses incomplete work and requires recorded mentor approval", () => {
  const packet = {
    milestone: 4,
    mentorGate: true,
    stories: [{ id: "SWAI-201" }, { id: "SWAI-204" }]
  };
  const incompleteIssues = [{ number: 1, title: "[SWAI-201] Story", state: "CLOSED" }];
  assert.deepEqual(incompleteStoryIds(packet, incompleteIssues), ["SWAI-204"]);

  const completeIssues = [
    ...incompleteIssues,
    { number: 2, title: "[SWAI-204] Review", state: "CLOSED" },
    { number: 3, title: "[MENTOR] Milestone 4: ClearPath", state: "CLOSED" }
  ];
  assert.deepEqual(incompleteStoryIds(packet, completeIssues), []);
  assert.equal(closedMentorReview(packet, completeIssues)?.number, 3);
  assert.equal(hasMentorApproval("Decision: Changes requested"), false);
  assert.equal(hasMentorApproval("Decision: Approved"), true);
});

test("milestone 2 requires an AI-assisted visual user story", async () => {
  const planning = (await packets())[2];
  const story = planning.stories.find((candidate) => candidate.id === "SWAI-027");
  assert.ok(story);
  assert.match(story.context, /Codex/);
  assert.match(story.definitionOfDone.join(" "), /Markdown lint and Mermaid rendering pass/);
  assert.match(story.acceptanceCriteria.join(" "), /Given\/When\/Then/);
  assert.match(story.acceptanceCriteria.join(" "), /plain-text route/);
});
