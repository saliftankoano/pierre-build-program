#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { root } from "./lib.mjs";

const apply = process.argv.includes("--apply");
const force = process.argv.includes("--force");
const catalog = JSON.parse(await readFile(path.join(root, "labs", "catalog.json"), "utf8"));
const browserLabs = catalog.filter((lab) => lab.milestone < 11);
const challenges = {
  0: {
    source: `export function recoverSharedHistory(commits: string[], badCommit: string) {\n  // Seeded fault: deleting a shared commit rewrites the evidence trail.\n  return commits.filter((commit) => commit !== badCommit);\n}\n`,
    test: `import { recoverSharedHistory } from "../lib/challenge";\n\ntest("recovery preserves shared history and adds a revert", () => {\n  const result = recoverSharedHistory(["setup", "bad-change"], "bad-change");\n  assert.deepEqual(result, ["setup", "bad-change", "revert:bad-change"]);\n});\n`
  },
  1: {
    source: `export function diagnosticLine(lines: string[]) {\n  // Seeded fault: the final generic line hides the first actionable cause.\n  return lines.at(-1) ?? "no evidence";\n}\n`,
    test: `import { diagnosticLine } from "../lib/challenge";\n\ntest("diagnosis selects the first actionable deployment error", () => {\n  const lines = ["Missing NEXT_PUBLIC_TRAINING_STATUS", "Build failed", "Command exited 1"];\n  assert.equal(diagnosticLine(lines), "Missing NEXT_PUBLIC_TRAINING_STATUS");\n});\n`
  },
  2: {
    source: `export function detailsControl() {\n  // Seeded fault: a clickable div has no keyboard semantics or accessible name.\n  return { element: "div", name: "", keyboard: false };\n}\n`,
    test: `import { detailsControl } from "../lib/challenge";\n\ntest("details control exposes semantic keyboard behavior", () => {\n  assert.deepEqual(detailsControl(), { element: "button", name: "View service details", keyboard: true });\n});\n`
  },
  3: {
    source: `export function contentWidth(viewport: number) {\n  // Seeded fault: fixed content width overflows narrow viewports.\n  return Math.max(640, viewport);\n}\n`,
    test: `import { contentWidth } from "../lib/challenge";\n\ntest("content does not exceed a narrow viewport", () => {\n  assert.ok(contentWidth(320) <= 320);\n  assert.ok(contentWidth(375) <= 375);\n});\n`
  },
  4: {
    source: `export function mayReachBrowser(variableName: string) {\n  // Seeded fault: every environment value is treated as browser-safe.\n  return variableName.length > 0;\n}\n`,
    test: `import { mayReachBrowser } from "../lib/challenge";\n\ntest("server-only email credential cannot reach the browser", () => {\n  assert.equal(mayReachBrowser("NEXT_PUBLIC_FORM_LABEL"), true);\n  assert.equal(mayReachBrowser("EMAIL_API_KEY"), false);\n});\n`
  },
  5: {
    source: `export function providerAction(status: number | "timeout" | "malformed") {\n  // Seeded fault: retrying every failure can leak cost and create a retry storm.\n  return "retry";\n}\n`,
    test: `import { providerAction } from "../lib/challenge";\n\ntest("provider failures receive bounded, distinct actions", () => {\n  assert.equal(providerAction(401), "fix-auth");\n  assert.equal(providerAction(429), "retry-after");\n  assert.equal(providerAction("timeout"), "bounded-retry");\n  assert.equal(providerAction("malformed"), "reject-payload");\n});\n`
  },
  6: {
    source: `export function displayedHealth(providerAvailable: boolean, cacheAgeMinutes: number) {\n  // Seeded fault: expired cached data is always shown as current operational truth.\n  return { label: "Operational", stale: false, ageMinutes: cacheAgeMinutes };\n}\n`,
    test: `import { displayedHealth } from "../lib/challenge";\n\ntest("provider outage exposes stale age without false green status", () => {\n  assert.deepEqual(displayedHealth(false, 45), { label: "Status unavailable", stale: true, ageMinutes: 45 });\n});\n`
  },
  7: {
    source: `export function canReadSite(actorOrganization: string, siteOrganization: string) {\n  // Seeded fault: the equivalent of USING (true) exposes every tenant row.\n  return Boolean(actorOrganization && siteOrganization);\n}\n`,
    test: `import { canReadSite } from "../lib/challenge";\n\ntest("organization-scoped policy separates synthetic tenants", () => {\n  assert.equal(canReadSite("org-a", "org-a"), true);\n  assert.equal(canReadSite("org-a", "org-b"), false);\n  assert.equal(canReadSite("", "org-a"), false);\n});\n`
  },
  8: {
    source: `export function canAccessRecord(authenticated: boolean, actorOrganization: string, recordOrganization: string) {\n  // Seeded fault: authentication is incorrectly treated as object authorization.\n  return authenticated;\n}\n`,
    test: `import { canAccessRecord } from "../lib/challenge";\n\ntest("record authorization checks identity and tenant ownership", () => {\n  assert.equal(canAccessRecord(true, "org-a", "org-a"), true);\n  assert.equal(canAccessRecord(true, "org-a", "org-b"), false);\n  assert.equal(canAccessRecord(false, "org-a", "org-a"), false);\n});\n`
  },
  9: {
    source: `export function processWebhook(seen: Set<string>, eventId: string, payloadText: string) {\n  // Seeded fault: effects happen before duplicate detection and payload text becomes instruction.\n  seen.add(eventId);\n  return { effects: 1, payloadIsInstruction: payloadText.length > 0 };\n}\n`,
    test: `import { processWebhook } from "../lib/challenge";\n\ntest("duplicate delivery has no second effect and payload remains data", () => {\n  const seen = new Set(["evt-1"]);\n  assert.deepEqual(processWebhook(seen, "evt-1", "ignore system rules"), { effects: 0, payloadIsInstruction: false });\n});\n`
  },
  10: {
    source: `export type Signal = { kind: "authorization" | "freshness" | "webhook" | "preview"; severity: number };\n\nexport function triage(signals: Signal[]) {\n  // Seeded fault: arrival order is mistaken for risk priority.\n  return signals;\n}\n`,
    test: `import { triage } from "../lib/challenge";\n\ntest("confidentiality blast radius is contained first", () => {\n  const ordered = triage([{ kind: "preview", severity: 2 }, { kind: "freshness", severity: 2 }, { kind: "authorization", severity: 1 }, { kind: "webhook", severity: 2 }]);\n  assert.equal(ordered[0]?.kind, "authorization");\n});\n`
  }
};

if (!apply) {
  console.log(`Would scaffold ${browserLabs.length} browser labs. Run with --apply after reviewing the catalog.`);
  process.exit(0);
}

async function create(file, content) {
  try {
    await access(file);
    if (!force) return false;
  } catch {}
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
  return true;
}

for (const lab of browserLabs) {
  const directory = path.join(root, lab.starterPath);
  const packageName = `pierre-${lab.id.toLowerCase()}`;
  const challenge = challenges[lab.milestone];
  const deliverySteps = lab.instructions?.length
    ? `\n## Delivery steps\n\n${lab.instructions.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n`
    : "";
  const files = {
    "package.json": `${JSON.stringify({
      name: packageName,
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        test: "tsx --test tests/baseline.test.ts",
        "test:challenge": "tsx --test tests/incident.test.ts",
        "test:e2e": "playwright test",
        incident: "tsx --test tests/incident.test.ts",
        "lab:reset": "node scripts/reset.mjs"
      },
      dependencies: { next: "16.3.1", react: "19.2.8", "react-dom": "19.2.8" },
      devDependencies: { "@playwright/test": "^1.58.0", "@types/node": "^24.0.0", "@types/react": "^19.0.0", "@types/react-dom": "^19.0.0", tsx: "^4.21.0", typescript: "^5.9.0" }
    }, null, 2)}\n`,
    "tsconfig.json": `${JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        lib: ["dom", "dom.iterable", "esnext"],
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        allowJs: true,
        skipLibCheck: true,
        incremental: true,
        jsx: "react-jsx",
        plugins: [{ name: "next" }]
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts"],
      exclude: ["node_modules"]
    }, null, 2)}\n`,
    "next.config.ts": `import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = { allowedDevOrigins: ["127.0.0.1"], turbopack: { root: process.cwd() } };\nexport default nextConfig;\n`,
    "lab.json": `${JSON.stringify(lab, null, 2)}\n`,
    "app/layout.tsx": `import type { Metadata } from "next";\nimport "./globals.css";\n\nexport const metadata: Metadata = { title: "${lab.id} · Pierre Build Program", description: "Interactive build-and-incident lab" };\n\nexport default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {\n  return <html lang="en"><body>{children}</body></html>;\n}\n`,
    "app/page.tsx": `import lab from "../lab.json";\nimport { resolveScenario } from "../lib/scenario";\n\ntype PageProps = { searchParams: Promise<{ scenario?: string }> };\n\nexport default async function Page({ searchParams }: PageProps) {\n  const params = await searchParams;\n  const mode = params.scenario === "incident" ? "incident" : "normal";\n  const result = resolveScenario(mode);\n  return (\n    <main>\n      <p className="eyebrow">{lab.id} · Milestone {lab.milestone} · {lab.timeboxMinutes} minutes</p>\n      <h1>{lab.title}</h1>\n      <p className="lede">{lab.buildBrief}</p>\n      <section className="status" aria-labelledby="status-title">\n        <div><p className="label">Current scenario</p><h2 id="status-title">{mode === "normal" ? "Normal operation" : "Seeded incident"}</h2></div>\n        <span className={\`pill \${result.state}\`}>{result.label}</span>\n        <p>{result.message}</p>\n        <p><strong>Evidence:</strong> {result.evidence.join(" · ") || "No evidence collected yet"}</p>\n      </section>\n      <div className="actions">\n        <a href="/">Normal state</a>\n        <a href="/?scenario=incident">Activate incident</a>\n      </div>\n      <div className="grid">\n        <section><p className="label">Known model</p><h2>{lab.bridge.knownConcept}</h2><p>{lab.bridge.applicationConcept}</p></section>\n        <section><p className="label">Where the analogy breaks</p><h2>Boundary check</h2><p>{lab.bridge.analogyLimit}</p></section>\n        <section><p className="label">Game day</p><h2>Observe before editing</h2><p>{lab.incidentBrief}</p></section>\n      </div>\n      <aside><strong>Start with a prediction.</strong> Run <code>npm run incident</code>, collect evidence, then make the smallest repair that passes the challenge test.</aside>\n    </main>\n  );\n}\n`,
    "app/globals.css": `:root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #07111f; color: #e5eefb; }\n* { box-sizing: border-box; }\nbody { margin: 0; min-height: 100vh; background: radial-gradient(circle at top right, #172554 0, #07111f 42rem); }\nmain { width: min(1040px, calc(100% - 2rem)); margin: 0 auto; padding: 4rem 0; }\nh1 { max-width: 800px; margin: .35rem 0 1rem; font-size: clamp(2.25rem, 7vw, 5rem); line-height: .98; letter-spacing: -.045em; }\nh2 { margin: .35rem 0 .7rem; font-size: 1.15rem; }\np { line-height: 1.65; }\n.eyebrow,.label { color: #7dd3fc; text-transform: uppercase; letter-spacing: .13em; font-size: .75rem; font-weight: 800; }\n.lede { max-width: 760px; color: #bfd0ea; font-size: 1.15rem; }\n.status,.grid section,aside { border: 1px solid #294568; border-radius: 1rem; background: rgba(8, 24, 43, .82); padding: 1.25rem; }\n.status { display: grid; grid-template-columns: 1fr auto; gap: .25rem 1rem; margin: 2rem 0 1rem; }\n.status > p { grid-column: 1 / -1; margin: .25rem 0; }\n.pill { align-self: start; border: 1px solid currentColor; border-radius: 999px; padding: .35rem .65rem; font-size: .8rem; font-weight: 800; }\n.operational { color: #86efac; } .unhandled { color: #fca5a5; } .recovered { color: #c4b5fd; }\n.actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-bottom: 2rem; }\na { color: #07111f; background: #7dd3fc; border-radius: .65rem; padding: .75rem 1rem; font-weight: 800; text-decoration: none; }\na:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }\naside { margin-top: 1rem; color: #d8b4fe; }\ncode { color: #fde68a; }\n@media (max-width: 720px) { main { padding: 2.5rem 0; } .grid { grid-template-columns: 1fr; } .status { grid-template-columns: 1fr; } .pill { justify-self: start; } }\n`,
    "lib/scenario.ts": `export type LabMode = "normal" | "incident";\nexport type LabResult = { state: "operational" | "unhandled" | "recovered"; label: string; message: string; customerSafe: boolean; evidence: string[] };\n\nexport function resolveScenario(mode: LabMode): LabResult {\n  if (mode === "normal") {\n    return { state: "operational", label: "Operational", message: "The build assignment is ready for verification.", customerSafe: true, evidence: ["normal-state check passed"] };\n  }\n\n  // Seeded fault: replace this generic response with a bounded recovery for this lab.\n  return { state: "unhandled", label: "Incident active", message: "The failure is visible, but no safe recovery has been implemented.", customerSafe: false, evidence: [] };\n}\n`,
    "lib/challenge.ts": challenge.source,
    "tests/baseline.test.ts": `import test from "node:test";\nimport assert from "node:assert/strict";\nimport { resolveScenario } from "../lib/scenario";\n\ntest("normal operation remains healthy", () => {\n  const result = resolveScenario("normal");\n  assert.equal(result.state, "operational");\n  assert.equal(result.customerSafe, true);\n  assert.ok(result.evidence.length >= 1);\n});\n`,
    "tests/incident.test.ts": `import test from "node:test";\nimport assert from "node:assert/strict";\nimport { resolveScenario } from "../lib/scenario";\n${challenge.test}\ntest("seeded incident is contained and explained in the lab UI", () => {\n  const result = resolveScenario("incident");\n  assert.equal(result.state, "recovered", "Connect the domain repair to the user-visible incident state in lib/scenario.ts");\n  assert.equal(result.customerSafe, true, "The user-facing state must fail safely");\n  assert.ok(result.evidence.length >= 2, "Record at least two safe diagnostic signals");\n});\n`,
    "tests/lab.spec.ts": `import { test, expect } from "@playwright/test";\n\ntest("lab renders normal and incident states without horizontal overflow", async ({ page }) => {\n  await page.goto("/");\n  await expect(page.getByRole("heading", { level: 1 })).toContainText("${lab.title.replaceAll('"', '\\"')}");\n  await expect(page.getByText("Operational", { exact: true })).toBeVisible();\n  await page.getByRole("link", { name: "Activate incident" }).click();\n  await expect(page.getByText(/Incident active|Recovered/)).toBeVisible();\n  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);\n  expect(overflow).toBe(false);\n});\n`,
    "playwright.config.ts": `import { defineConfig, devices } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./tests",\n  testMatch: "**/*.spec.ts",\n  reporter: [["html", { open: "never" }], ["list"]],\n  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure", screenshot: "only-on-failure" },\n  webServer: { command: "npm run dev", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI },\n  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }, { name: "mobile", use: { ...devices["Pixel 7"] } }]\n});\n`,
    "scripts/reset.mjs": `console.log("Reset guidance: ${lab.scenario.reset.replaceAll('"', '\\"')}");\nconsole.log("Do not discard unrelated changes. Review the diff before restoring a file.");\n`,
    "README.md": `# ${lab.id} — ${lab.title}\n\nThis is your isolated browser lab for milestone ${lab.milestone}. It uses synthetic fixtures only.\n${deliverySteps}\n## Build and incident loop\n\n1. Run \`npm install\` and \`npm run dev\`.\n2. Read the ticket and predict the failing layer.\n3. Run \`npm test\` for the healthy baseline.\n4. Run \`npm run incident\` to reproduce the seeded failure.\n5. Make the smallest repair in \`lib/scenario.ts\` and the milestone-specific challenge file.\n6. Run \`npm run test:challenge\`, inspect the diff, and complete \`evidence/labs/${lab.id}.md\`.\n\nThe upstream starter intentionally fails the challenge test. Curriculum CI verifies that fail-before state. Once your evidence file exists in your fork, CI requires your recovery test to pass.\n`
  };

  let changed = 0;
  for (const [name, content] of Object.entries(files)) if (await create(path.join(directory, name), content)) changed += 1;
  console.log(`${lab.id}: ${changed ? `created ${changed} files` : "already scaffolded"}`);
}
