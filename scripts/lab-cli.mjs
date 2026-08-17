#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { githubRepoFromRemote, learnerLink, root, run } from "./lib.mjs";

const [command, id, levelText] = process.argv.slice(2);
const catalog = JSON.parse(await readFile(path.join(root, "labs", "catalog.json"), "utf8"));
const lab = catalog.find((candidate) => candidate.id === id);

let repo = process.env.GITHUB_REPOSITORY;
if (!repo) {
  try { repo = githubRepoFromRemote(run("git", ["remote", "get-url", "origin"], { capture: true })); }
  catch { /* A downloaded archive has no Git remote; learnerLink uses a visible fallback. */ }
}

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
  console.log(`Primary: ${learnerLink(lab.sandboxUrl, repo)}`);
  console.log(`Fallback: ${learnerLink(lab.fallbackUrl, repo)}`);
  console.log(`Local path: ${lab.starterPath}`);
  run("npm", ["run", "dev"], { cwd: directory });
} else if (command === "test") {
  let completed = true;
  const evidencePath = path.join("evidence", "labs", `${lab.id}.md`);
  try { await access(path.join(root, evidencePath)); }
  catch { completed = false; }
  if (completed) run("node", ["scripts/validate-evidence.mjs", evidencePath]);
  run("npm", ["run", completed ? "test:challenge" : "test"], { cwd: directory });
  if (!completed) console.log(`Starter baseline passed. Run npm run incident in ${lab.starterPath} to observe the fail-before state.`);
} else {
  throw new Error("Use start, test, or hint.");
}
