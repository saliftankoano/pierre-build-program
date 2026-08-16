import test from "node:test";
import assert from "node:assert/strict";
import { packets, issueBody } from "../scripts/lib.mjs";

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

test("released issue body preserves required agency interface", async () => {
  const [packet] = await packets();
  const body = issueBody(packet.stories[0], packet);
  for (const heading of ["Acceptance criteria", "Data/API contract", "Expectations", "Dependencies", "Explicit non-goals", "Definition of Done", "Evidence required", "Just-in-time concepts"]) {
    assert.match(body, new RegExp(`## ${heading}`));
  }
});
