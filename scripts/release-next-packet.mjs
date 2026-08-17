#!/usr/bin/env node
import process from "node:process";
import { packets, repoFromArgs, run, issueBody } from "./lib.mjs";

const args = process.argv.slice(2);
const repo = repoFromArgs(args);
const milestoneIndex = args.indexOf("--milestone");
const completed = Number(milestoneIndex >= 0 ? args[milestoneIndex + 1] : process.env.COMPLETED_MILESTONE);
const apply = args.includes("--apply") || process.env.GITHUB_ACTIONS === "true";
if (!Number.isInteger(completed) || completed < 0 || completed > 11) throw new Error("Provide --milestone 0 through 11.");
if (completed === 11) { console.log("Milestone 11 is the final packet. Nothing more to release."); process.exit(0); }

const packet = (await packets())[completed + 1];
console.log(`${apply ? "Releasing" : "Dry run:"} milestone ${packet.milestone} in ${repo}`);
if (!apply) {
  for (const story of packet.stories) console.log(`- [${story.id}] ${story.title}`);
  console.log("Run again with --apply after the milestone PR is accepted.");
  process.exit(0);
}

run("gh", ["label", "create", `milestone-${packet.milestone}`, "--repo", repo, "--color", "0969da", "--description", `Milestone ${packet.milestone} work`, "--force"]);
for (const story of packet.stories) {
  const existing = run("gh", ["issue", "list", "--repo", repo, "--state", "all", "--search", `\"${story.id}\" in:title`, "--json", "number", "--jq", "length"], { capture: true });
  if (existing !== "0") { console.log(`Skipping existing ${story.id}`); continue; }
  const typeLabels = story.type === "lab" ? ",lab,game-day" : "";
  run("gh", ["issue", "create", "--repo", repo, "--title", `[${story.id}] ${story.title}`, "--body", issueBody(story, packet, repo), "--label", `agency-story,milestone-${packet.milestone}${typeLabels}`]);
}
run("node", ["scripts/mission-control.mjs", "--repo", repo, "--apply"]);
console.log(`Milestone ${packet.milestone} released.`);
