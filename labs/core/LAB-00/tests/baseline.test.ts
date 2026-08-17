import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";

test("normal operation remains healthy", () => {
  const result = resolveScenario("normal");
  assert.equal(result.state, "operational");
  assert.equal(result.customerSafe, true);
  assert.ok(result.evidence.length >= 1);
});
