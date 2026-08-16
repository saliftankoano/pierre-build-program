#!/usr/bin/env node
import process from "node:process";
import { packets, repoFromArgs, run, issueBody } from "./lib.mjs";

const args = process.argv.slice(2);
const repo = repoFromArgs(args);
const apply = args.includes("--apply");
const packet = (await packets())[0];
const labels = [
  ["agency-story", "5319e7", "Progressive curriculum work item"],
  ["milestone-0", "0969da", "Milestone 0 work"],
  ["milestone-accepted", "0e8a16", "Mentor/acceptance gate passed"],
  ["intake", "1d76db", "New idea intake"], ["needs-triage", "d4c5f9", "Needs review"],
  ["clarification", "fbca04", "Material question"], ["blocked", "b60205", "Work is blocked"],
  ["bug", "d73a4a", "Incorrect behavior"], ["qa", "c5def5", "QA finding"],
  ["security", "b60205", "Security review"], ["scope-change", "e99695", "Scope change"],
  ["needs-decision", "f9d0c4", "Decision required"], ["mentor-review", "0e8a16", "Mentor gate"]
];

console.log(`${apply ? "Creating" : "Dry run:"} milestone 0 agency board in ${repo}`);
if (!apply) {
  console.log("Would create standard labels and these issues:");
  for (const story of packet.stories) console.log(`- [${story.id}] ${story.title}`);
  console.log("Run again with --apply after checking the repository name and output.");
  process.exit(0);
}

run("gh", ["auth", "status"]);
for (const [name, color, description] of labels) {
  run("gh", ["label", "create", name, "--repo", repo, "--color", color, "--description", description, "--force"]);
}
for (const story of packet.stories) {
  const existing = run("gh", ["issue", "list", "--repo", repo, "--state", "all", "--search", `\"${story.id}\" in:title`, "--json", "number", "--jq", "length"], { capture: true });
  if (existing !== "0") { console.log(`Skipping existing ${story.id}`); continue; }
  run("gh", ["issue", "create", "--repo", repo, "--title", `[${story.id}] ${story.title}`, "--body", issueBody(story, packet), "--label", `agency-story,milestone-0`]);
}
console.log("Milestone 0 is ready. Complete its issues in order.");
