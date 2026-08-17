import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { contentWidth } from "../lib/challenge";

test("content does not exceed a narrow viewport", () => {
  assert.ok(contentWidth(320) <= 320);
  assert.ok(contentWidth(375) <= 375);
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
