import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { recoverSharedHistory } from "../lib/challenge";

test("recovery preserves shared history and adds a revert", () => {
  const result = recoverSharedHistory(["setup", "bad-change"], "bad-change");
  assert.deepEqual(result, ["setup", "bad-change", "revert:bad-change"]);
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
