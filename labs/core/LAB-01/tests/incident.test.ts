import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { diagnosticLine } from "../lib/challenge";

test("diagnosis selects the first actionable deployment error", () => {
  const lines = ["Missing NEXT_PUBLIC_TRAINING_STATUS", "Build failed", "Command exited 1"];
  assert.equal(diagnosticLine(lines), "Missing NEXT_PUBLIC_TRAINING_STATUS");
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
