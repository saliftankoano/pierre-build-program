import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { canReadSite } from "../lib/challenge";

test("organization-scoped policy separates synthetic tenants", () => {
  assert.equal(canReadSite("org-a", "org-a"), true);
  assert.equal(canReadSite("org-a", "org-b"), false);
  assert.equal(canReadSite("", "org-a"), false);
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
