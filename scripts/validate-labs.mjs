#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { packets, root } from "./lib.mjs";

const errors = [];
const values = await packets();
const labs = values.flatMap((packet) => packet.stories.filter((story) => story.type === "lab").map((story) => story.labContract));

for (const lab of labs) {
  if (lab.hints.length !== 3) errors.push(`${lab.id} needs exactly three hints`);
  if (lab.milestone === 11) continue;
  const directory = path.join(root, lab.starterPath);
  for (const required of ["package.json", "next.config.ts", "app/page.tsx", "lib/scenario.ts", "lib/challenge.ts", "tests/baseline.test.ts", "tests/incident.test.ts", "tests/lab.spec.ts", "playwright.config.ts", "lab.json"]) {
    try { await access(path.join(directory, required)); }
    catch { errors.push(`${lab.id} missing ${required}`); }
  }
  let pkg;
  try { pkg = JSON.parse(await readFile(path.join(directory, "package.json"), "utf8")); }
  catch { continue; }
  for (const script of ["dev", "build", "test", "test:challenge", "test:e2e", "incident", "lab:reset"]) if (!pkg.scripts?.[script]) errors.push(`${lab.id} missing script ${script}`);
  if (process.env.VERIFY_LAB_STARTERS === "true") {
    const baseline = spawnSync("npm", ["test"], { cwd: directory, encoding: "utf8" });
    if (baseline.status !== 0) errors.push(`${lab.id} healthy baseline failed\n${baseline.stderr || baseline.stdout}`);
    const incident = spawnSync("npm", ["run", "test:challenge"], { cwd: directory, encoding: "utf8" });
    if (incident.status === 0) errors.push(`${lab.id} starter incident unexpectedly passes; preserve the fail-before challenge`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Validated ${labs.length} lab contracts and ${labs.filter((lab) => lab.milestone < 11).length} browser lab packages.`);
