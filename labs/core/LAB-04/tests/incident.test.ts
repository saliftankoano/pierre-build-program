import test from "node:test";
import assert from "node:assert/strict";
import { resolveScenario } from "../lib/scenario";
import { mayReachBrowser } from "../lib/challenge";

test("server-only email credential cannot reach the browser", () => {
  assert.equal(mayReachBrowser("NEXT_PUBLIC_FORM_LABEL"), true);
  assert.equal(mayReachBrowser("EMAIL_API_KEY"), false);
});

test("seeded incident is contained and explained in the lab UI", () => {
  const result = resolveScenario("incident");
  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");
  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");
  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");
});
