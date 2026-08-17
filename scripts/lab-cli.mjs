#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { root, run } from "./lib.mjs";

const [command, id, levelText] = process.argv.slice(2);
const catalog = JSON.parse(await readFile(path.join(root, "labs", "catalog.json"), "utf8"));
const lab = catalog.find((candidate) => candidate.id === id);

if (!lab) {
  console.log("Available labs:");
  for (const item of catalog) console.log(`- ${item.id}: ${item.title}`);
  if (id) throw new Error(`Unknown lab: ${id}`);
  process.exit(0);
}

if (command === "hint") {
  const level = Number(levelText ?? 1);
  if (!Number.isInteger(level) || level < 1 || level > 3) throw new Error("Hint level must be 1, 2, or 3.");
  console.log(`${lab.id} hint ${level}/3: ${lab.hints[level - 1]}`);
  process.exit(0);
}

if (lab.delivery === "project-preview") {
  console.log(`${lab.id} runs against the capstone preview. ${lab.scenario.activation}.`);
  console.log(`Evidence: ${lab.evidence.join("; ")}`);
  process.exit(0);
}

const directory = path.join(root, lab.starterPath);
if (command === "start") {
  console.log(`${lab.id}: ${lab.title}`);
  console.log(`Primary: ${lab.sandboxUrl}`);
  console.log(`Fallback: ${lab.fallbackUrl}`);
  console.log(`Local path: ${lab.starterPath}`);
  run("npm", ["run", "dev"], { cwd: directory });
} else if (command === "test") {
  let completed = true;
  try { await access(path.join(root, "evidence", "labs", `${lab.id}.md`)); }
  catch { completed = false; }
  run("npm", ["run", completed ? "test:challenge" : "test"], { cwd: directory });
  if (!completed) console.log(`Starter baseline passed. Run npm run incident in ${lab.starterPath} to observe the fail-before state.`);
} else {
  throw new Error("Use start, test, or hint.");
}
