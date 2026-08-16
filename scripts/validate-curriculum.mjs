import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { packets, root } from "./lib.mjs";

const errors = [];
const requiredStory = ["id", "type", "priority", "epic", "title", "persona", "outcome", "context", "acceptanceCriteria", "expectations", "dependencies", "nonGoals", "definitionOfDone", "evidence", "concepts"];
const expectationFields = ["security", "privacy", "accessibility", "analytics"];
const allowedTypes = new Set(["kickoff", "story", "bug", "spike", "chore", "change", "review"]);
const allowedPriorities = new Set(["P0", "P1", "P2", "P3"]);

const allPackets = await packets();
const ids = new Set();

for (const [index, packet] of allPackets.entries()) {
  if (packet.milestone !== index) errors.push(`packet index ${index} has milestone ${packet.milestone}`);
  for (const field of ["title", "project", "context"]) if (!packet[field]) errors.push(`milestone ${index} missing ${field}`);
  if (!Number.isInteger(packet.hours) || packet.hours < 1) errors.push(`milestone ${index} has invalid hours`);
  if (typeof packet.mentorGate !== "boolean") errors.push(`milestone ${index} mentorGate must be boolean`);
  if (!Array.isArray(packet.stories) || packet.stories.length === 0) errors.push(`milestone ${index} has no stories`);

  for (const story of packet.stories ?? []) {
    for (const field of requiredStory) if (story[field] === undefined) errors.push(`${story.id ?? "unknown story"} missing ${field}`);
    if (!/^SWAI-\d{3}$/.test(story.id ?? "")) errors.push(`${story.id ?? "unknown"} has invalid ID`);
    if (ids.has(story.id)) errors.push(`duplicate story ID ${story.id}`);
    ids.add(story.id);
    if (!allowedTypes.has(story.type)) errors.push(`${story.id} invalid type ${story.type}`);
    if (!allowedPriorities.has(story.priority)) errors.push(`${story.id} invalid priority ${story.priority}`);
    for (const field of ["acceptanceCriteria", "dependencies", "nonGoals", "definitionOfDone", "evidence", "concepts"]) {
      if (!Array.isArray(story[field])) errors.push(`${story.id} ${field} must be an array`);
    }
    for (const field of expectationFields) if (typeof story.expectations?.[field] !== "string") errors.push(`${story.id} expectations.${field} missing`);
  }
}

if (allPackets.length !== 12) errors.push(`expected 12 packets, found ${allPackets.length}`);
const hours = allPackets.reduce((sum, packet) => sum + packet.hours, 0);
if (hours !== 178) errors.push(`expected 178 total hours, found ${hours}`);
for (const milestone of [4, 8, 10, 11]) if (!allPackets[milestone]?.mentorGate) errors.push(`milestone ${milestone} must be a mentor gate`);
for (const packet of allPackets) if (![4, 8, 10, 11].includes(packet.milestone) && packet.mentorGate) errors.push(`milestone ${packet.milestone} should not be a mentor gate`);

const curriculum = (await readdir(path.join(root, "curriculum"))).filter((name) => name.endsWith(".md"));
if (curriculum.length !== 12) errors.push(`expected 12 curriculum guides, found ${curriculum.length}`);
for (const guide of curriculum) {
  const content = await readFile(path.join(root, "curriculum", guide), "utf8");
  if (!content.includes("```mermaid")) errors.push(`${guide} is missing its required visual map`);
}
const readme = await readFile(path.join(root, "README.md"), "utf8");
const readmeDiagrams = readme.match(/```mermaid/g)?.length ?? 0;
if (readmeDiagrams < 8) errors.push(`README visual guide requires at least 8 Mermaid diagrams; found ${readmeDiagrams}`);

const markdownFiles = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".md")) markdownFiles.push(full);
  }
}
await walk(root);
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdownFiles) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].split("#")[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    try { await access(path.resolve(path.dirname(file), decodeURIComponent(target))); }
    catch { errors.push(`${path.relative(root, file)} has broken local link: ${target}`); }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Validated ${allPackets.length} packets, ${ids.size} stories, ${curriculum.length} visual guides, ${readmeDiagrams} README diagrams, ${hours} hours, and ${markdownFiles.length} Markdown files.`);
