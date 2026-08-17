import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import { packets, root } from "./lib.mjs";

const errors = [];
const requiredStory = ["id", "type", "priority", "epic", "title", "persona", "outcome", "context", "acceptanceCriteria", "expectations", "dependencies", "nonGoals", "definitionOfDone", "evidence", "concepts"];
const expectationFields = ["security", "privacy", "accessibility", "analytics"];
const allowedTypes = new Set(["kickoff", "story", "bug", "spike", "chore", "change", "review", "lab"]);
const allowedPriorities = new Set(["P0", "P1", "P2", "P3"]);

const allPackets = await packets();
const ids = new Set();
const labIds = new Set();

const ajv = new Ajv2020({ allErrors: true, strict: false });
for (const name of ["lab.schema.json", "story.schema.json", "sprint-packet.schema.json"]) {
  ajv.addSchema(JSON.parse(await readFile(path.join(root, "schemas", name), "utf8")));
}
const packetSchemaId = "https://github.com/saliftankoano/pierre-build-program/schemas/sprint-packet.schema.json";
const validatePacketSchema = ajv.getSchema(packetSchemaId);
if (!validatePacketSchema) errors.push("could not compile sprint packet schema");

for (const [index, packet] of allPackets.entries()) {
  if (validatePacketSchema && !validatePacketSchema(packet)) {
    for (const error of validatePacketSchema.errors ?? []) errors.push(`milestone ${index} schema ${error.instancePath || "/"}: ${error.message}`);
  }
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
    if (story.type === "lab") {
      const lab = story.labContract;
      if (!lab) errors.push(`${story.id} is a lab without labContract`);
      else {
        if (lab.milestone !== packet.milestone) errors.push(`${story.id} lab milestone ${lab.milestone} does not match packet ${packet.milestone}`);
        if (lab.id !== `LAB-${String(packet.milestone).padStart(2, "0")}`) errors.push(`${story.id} has unexpected lab ID ${lab.id}`);
        if (labIds.has(lab.id)) errors.push(`duplicate lab ID ${lab.id}`);
        labIds.add(lab.id);
        if (lab.core !== true) errors.push(`${story.id} core must be true`);
        if (!Array.isArray(lab.hints) || lab.hints.length !== 3) errors.push(`${story.id} must have exactly three hints`);
        for (const field of ["acceptanceTests", "evidence", "predictionQuestions", "defenseQuestions"]) {
          if (!Array.isArray(lab[field]) || lab[field].length < 2) errors.push(`${story.id} labContract.${field} is incomplete`);
        }
        if (!lab.bridge?.analogyLimit) errors.push(`${story.id} must explain where its concept bridge breaks`);
        if (packet.milestone < 11) {
          try { await access(path.join(root, lab.starterPath)); }
          catch { errors.push(`${story.id} starter path does not exist: ${lab.starterPath}`); }
        }
      }
    } else if (story.labContract) errors.push(`${story.id} has a labContract but is not type lab`);
  }
  const labsInPacket = (packet.stories ?? []).filter((story) => story.type === "lab");
  if (labsInPacket.length !== 1) errors.push(`milestone ${index} must contain exactly one lab story; found ${labsInPacket.length}`);
}

if (allPackets.length !== 12) errors.push(`expected 12 packets, found ${allPackets.length}`);
if (labIds.size !== 12) errors.push(`expected 12 core labs, found ${labIds.size}`);
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
    if ([".git", ".next", ".vercel", "node_modules", "playwright-report", "test-results"].includes(entry.name)) continue;
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
console.log(`Validated ${allPackets.length} packets, ${ids.size} stories, ${labIds.size} core labs, ${curriculum.length} visual guides, ${readmeDiagrams} README diagrams, ${hours} hours, and ${markdownFiles.length} Markdown files.`);
