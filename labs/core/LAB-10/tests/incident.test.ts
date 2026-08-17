import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { triage } from "../lib/challenge";

test("confidentiality blast radius is contained first", () => {
  const ordered = triage([{ kind: "preview", severity: 2 }, { kind: "freshness", severity: 2 }, { kind: "authorization", severity: 1 }, { kind: "webhook", severity: 2 }]);
  assert.equal(ordered[0]?.kind, "authorization");
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
