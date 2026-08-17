#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { evidenceErrors } from "./evidence-lib.mjs";
import { root } from "./lib.mjs";

const supplied = process.argv.slice(2);
const directory = path.join(root, "evidence", "labs");
const files = supplied.length
  ? supplied.map((file) => path.resolve(root, file))
  : (await readdir(directory)).filter((name) => /^LAB-(0[0-9]|1[01])\.md$/.test(name)).map((name) => path.join(directory, name));
const errors = [];

for (const file of files) {
  const name = path.basename(file);
  const match = name.match(/^(LAB-(?:0[0-9]|1[01]))\.md$/);
  if (!match) {
    errors.push(`${path.relative(root, file)}: expected LAB-00.md through LAB-11.md`);
    continue;
  }
  const content = await readFile(file, "utf8");
  for (const error of evidenceErrors(content, match[1])) errors.push(`${path.relative(root, file)}: ${error}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Validated ${files.length} completed lab evidence file${files.length === 1 ? "" : "s"}.`);
