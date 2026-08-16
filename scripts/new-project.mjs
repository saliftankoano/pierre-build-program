#!/usr/bin/env node
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { run, root } from "./lib.mjs";

const name = process.argv[2];
if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  throw new Error("Usage: npm run project:new -- lowercase-kebab-name");
}
const destination = path.resolve(root, "..", name);
try { await access(destination); throw new Error(`Destination already exists: ${destination}`); }
catch (error) { if (error.code !== "ENOENT") throw error; }

console.log(`Creating strict Next.js project at ${destination}`);
run("npx", ["create-next-app@latest", destination, "--typescript", "--tailwind", "--eslint", "--app", "--src-dir", "--import-alias", "@/*", "--use-npm", "--yes"]);
run("npm", ["install", "zod", "@supabase/supabase-js"], { cwd: destination });
run("npm", ["install", "--save-dev", "supabase", "vitest", "@playwright/test"], { cwd: destination });

const packagePath = path.join(destination, "package.json");
const pkg = JSON.parse(await readFile(packagePath, "utf8"));
pkg.scripts = {
  ...pkg.scripts,
  typecheck: "tsc --noEmit",
  test: "vitest run --passWithNoTests",
  "test:watch": "vitest",
  "test:e2e": "playwright test --pass-with-no-tests",
  check: "npm run lint && npm run typecheck && npm test"
};
await writeFile(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);

const files = {
  ".env.example": `# Copy to .env.local. Values below are intentionally empty placeholders.\nNEXT_PUBLIC_SUPABASE_URL=\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=\n# Server-only examples must never use NEXT_PUBLIC_.\nRESEND_API_KEY=\n`,
  "AGENTS.md": await readFile(path.join(root, "templates", "project-agents.example.md"), "utf8"),
  "docs/PRODUCT.md": `# Product context\n\n- User:\n- Problem:\n- Smallest useful outcome:\n- Success measure:\n- In scope:\n- Non-goals:\n- Current story:\n`,
  "docs/ARCHITECTURE.md": `# Architecture\n\n## Runtime boundaries\n\n- Browser:\n- Next.js server:\n- Supabase/external services:\n- Build and deployment:\n\n## Data flow\n\n## Security and authorization boundaries\n`,
  "docs/DECISIONS.md": `# Architecture decisions\n\nCreate one ADR in \`docs/decisions/\` for each consequential or reversible choice. Link it here.\n`,
  "docs/ENVIRONMENT.md": `# Environment inventory\n\nRecord variable names, purpose, owner, scope, and rotation process—never values.\n\n| Name | Public/server-only | Local/preview/production | Purpose | Owner |\n| --- | --- | --- | --- | --- |\n`,
  "docs/DEBUGGING.md": `# Debugging log\n\n## Problem\n\n- Environment/commit:\n- Reproduction:\n- Expected/actual:\n- Relevant redacted errors/logs:\n- Hypothesis and prediction:\n- Test/result:\n- Root cause/fix/regression evidence:\n`,
  "playwright.config.ts": `import { defineConfig, devices } from "@playwright/test";\n\nexport default defineConfig({\n  testDir: "./tests/e2e",\n  use: { baseURL: "http://127.0.0.1:3000", trace: "on-first-retry" },\n  webServer: { command: "npm run dev", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI },\n  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }]\n});\n`,
  ".github/workflows/ci.yml": `name: Project checks\n\non:\n  pull_request:\n  push:\n    branches: [main]\n\npermissions:\n  contents: read\n\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 24\n          cache: npm\n      - run: npm ci\n      - run: npm run check\n      - run: npm run build\n  e2e:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 24\n          cache: npm\n      - run: npm ci\n      - run: npx playwright install --with-deps chromium\n      - run: npm run test:e2e\n`,
  "supabase/README.md": `# Supabase local development\n\nUse migrations and seed data; do not make undocumented production-only schema changes. Start with the official workflow: https://supabase.com/docs/guides/local-development/overview\n\nTypical flow after Docker is installed: \`npx supabase init\`, \`npx supabase start\`, create a migration, reset locally, test RLS as multiple users, then review the SQL diff before linking or pushing.\n`
};

for (const [relative, content] of Object.entries(files)) {
  const target = path.join(destination, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
}
console.log("Created project context, placeholder environment contract, Supabase guidance, tests, and CI.");
console.log(`Next: cd ${destination} && npm run check && npm run build`);
