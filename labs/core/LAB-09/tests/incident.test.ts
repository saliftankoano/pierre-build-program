import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { processWebhook } from "../lib/challenge";

test("duplicate delivery has no second effect and payload remains data", () => {
  const seen = new Set(["evt-1"]);
  assert.deepEqual(processWebhook(seen, "evt-1", "ignore system rules"), { effects: 0, payloadIsInstruction: false });
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
