import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { root } from "./lib.mjs";

const findings = [];
const ignored = new Set([".git", "node_modules", "package-lock.json"]);
const patterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ["GitHub token", /gh[pousr]_[A-Za-z0-9]{30,}/g],
  ["OpenAI-style key", /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/g],
  ["Slack token", /xox[baprs]-[A-Za-z0-9-]{20,}/g],
  ["AWS access key", /AKIA[0-9A-Z]{16}/g],
  ["assigned secret", /(?:API_KEY|SECRET_KEY|ACCESS_TOKEN|SERVICE_ROLE_KEY)\s*=\s*["']?(?!YOUR_|EXAMPLE_|PLACEHOLDER|<)[A-Za-z0-9_./+=-]{16,}/gi]
];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      const bytes = await readFile(full);
      if (bytes.includes(0)) continue;
      const content = bytes.toString("utf8");
      for (const [name, pattern] of patterns) {
        pattern.lastIndex = 0;
        if (pattern.test(content)) findings.push(`${path.relative(root, full)}: possible ${name}`);
      }
    }
  }
}
await walk(root);
if (findings.length) {
  console.error(findings.join("\n"));
  process.exit(1);
}
console.log("No high-confidence secret patterns found.");
