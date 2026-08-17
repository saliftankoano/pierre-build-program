import test from "node:test";
import assert from "node:assert/strict";
import { packets, issueBody } from "../scripts/lib.mjs";
import { missionControlBody } from "../scripts/mission-control-lib.mjs";

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
