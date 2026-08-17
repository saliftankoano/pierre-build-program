#!/usr/bin/env node
import process from "node:process";
import { packets, repoFromArgs, run, issueBody } from "./lib.mjs";
import { closedMentorReview, hasMentorApproval, incompleteStoryIds } from "./release-readiness-lib.mjs";

const args = process.argv.slice(2);
const repo = repoFromArgs(args);
const milestoneIndex = args.indexOf("--milestone");
const completed = Number(milestoneIndex >= 0 ? args[milestoneIndex + 1] : process.env.COMPLETED_MILESTONE);
const apply = args.includes("--apply") || process.env.GITHUB_ACTIONS === "true";
if (!Number.isInteger(completed) || completed < 0 || completed > 11) throw new Error("Provide --milestone 0 through 11.");
const values = await packets();
const completedPacket = values[completed];
const packet = values[completed + 1];
console.log(completed === 11
  ? `${apply ? "Verifying" : "Dry run:"} final milestone 11 acceptance in ${repo}`
  : `${apply ? "Releasing" : "Dry run:"} milestone ${packet.milestone} in ${repo}`);
if (!apply) {
  if (completed === 11) console.log("Would verify all capstone issues and recorded mentor approval, then refresh Mission Control. There is no later packet.");
  else {
    for (const story of packet.stories) console.log(`- [${story.id}] ${story.title}`);
    console.log("Run again with --apply after the milestone PR is accepted.");
  }
  process.exit(0);
}

const issues = JSON.parse(run("gh", ["issue", "list", "--repo", repo, "--state", "all", "--limit", "500", "--json", "number,title,state,labels"], { capture: true }));
const incomplete = incompleteStoryIds(completedPacket, issues);
if (incomplete.length) {
  throw new Error(`Milestone ${completed} cannot release the next packet. Missing or open work: ${incomplete.join(", ")}.`);
}

if (completedPacket.mentorGate) {
  const review = closedMentorReview(completedPacket, issues);
  if (!review) throw new Error(`Milestone ${completed} requires a closed [MENTOR] Milestone ${completed}: review issue.`);
  const reviewDetails = JSON.parse(run("gh", ["issue", "view", String(review.number), "--repo", repo, "--json", "body,comments"], { capture: true }));
  const reviewText = [reviewDetails.body, ...(reviewDetails.comments ?? []).map((comment) => comment.body)].join("\n");
  if (!hasMentorApproval(reviewText)) {
    throw new Error(`Mentor review issue #${review.number} does not contain the exact approval record 'Decision: Approved'.`);
  }
}

if (completed === 11) {
  run("node", ["scripts/mission-control.mjs", "--repo", repo, "--apply"]);
  console.log("Final capstone acceptance verified. No later packet exists.");
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
