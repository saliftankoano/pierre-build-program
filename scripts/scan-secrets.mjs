import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { root } from "./lib.mjs";
import { secretFindings } from "./secret-scanner-lib.mjs";

const findings = [];
const ignored = new Set([".git", ".next", ".vercel", "coverage", "node_modules", "package-lock.json", "playwright-report", "test-results"]);
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      const bytes = await readFile(full);
      if (bytes.includes(0)) continue;
      const content = bytes.toString("utf8");
      for (const name of secretFindings(content)) findings.push(`${path.relative(root, full)}: possible ${name}`);
    }
  }
}
await walk(root);
if (findings.length) {
  console.error(findings.join("\n"));
  process.exit(1);
}
console.log("No high-confidence secret patterns found.");
