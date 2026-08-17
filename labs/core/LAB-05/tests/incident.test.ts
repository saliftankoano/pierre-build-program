import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { providerAction } from "../lib/challenge";

test("provider failures receive bounded, distinct actions", () => {
  assert.equal(providerAction(401), "fix-auth");
  assert.equal(providerAction(429), "retry-after");
  assert.equal(providerAction("timeout"), "bounded-retry");
  assert.equal(providerAction("malformed"), "reject-payload");
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
