#!/usr/bin/env node
import process from "node:process";
import { packets, repoFromArgs, run } from "./lib.mjs";
import { missionControlBody } from "./mission-control-lib.mjs";

const args = process.argv.slice(2);
const repo = repoFromArgs(args);
const apply = args.includes("--apply") || process.env.GITHUB_ACTIONS === "true";
const title = "[MISSION CONTROL] Pierre Build Program";

const issues = JSON.parse(run("gh", ["issue", "list", "--repo", repo, "--state", "all", "--limit", "500", "--json", "number,title,state,labels,url"], { capture: true }));
const pullRequests = JSON.parse(run("gh", ["pr", "list", "--repo", repo, "--state", "all", "--limit", "200", "--json", "number,title,state,mergedAt,labels,url"], { capture: true }));
const body = missionControlBody(await packets(), issues, pullRequests, repo);

const existing = issues.find((issue) => issue.title === title);
if (!apply) {
  console.log(body);
  console.log(`\nDry run: would ${existing ? `update issue #${existing.number}` : "create the Mission Control issue"} in ${repo}.`);
  process.exit(0);
}

run("gh", ["label", "create", "mission-control", "--repo", repo, "--color", "7c3aed", "--description", "Generated visual program dashboard", "--force"]);
if (existing) {
  run("gh", ["issue", "edit", String(existing.number), "--repo", repo, "--body", body, "--add-label", "mission-control"]);
  console.log(`Updated Mission Control issue #${existing.number}.`);
} else {
  run("gh", ["issue", "create", "--repo", repo, "--title", title, "--body", body, "--label", "mission-control"]);
  console.log("Created Mission Control issue.");
}
