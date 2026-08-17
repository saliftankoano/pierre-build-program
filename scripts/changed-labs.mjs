#!/usr/bin/env node
import process from "node:process";
import { run } from "./lib.mjs";

const all = [...Array(11).keys()].map((value) => `LAB-${String(value).padStart(2, "0")}`);
const base = process.env.BASE_SHA;
const head = process.env.HEAD_SHA ?? "HEAD";
let changed = all;

if (base && !/^0+$/.test(base)) {
  const files = run("git", ["diff", "--name-only", base, head], { capture: true }).split("\n").filter(Boolean);
  const shared = files.some((file) => ["labs/catalog.json", "scripts/scaffold-labs.mjs", "scripts/validate-labs.mjs", "scripts/validate-evidence.mjs", "scripts/evidence-lib.mjs"].includes(file));
  if (!shared) changed = [...new Set(files.map((file) => file.match(/^(?:labs\/core\/|evidence\/labs\/)(LAB-(?:0[0-9]|10))(?:\/|\.md$)/)?.[1]).filter(Boolean))].sort();
}

console.log(JSON.stringify(changed));
if (process.env.GITHUB_OUTPUT) {
  const { appendFileSync } = await import("node:fs");
  appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${JSON.stringify(changed)}\ncount=${changed.length}\n`);
}
