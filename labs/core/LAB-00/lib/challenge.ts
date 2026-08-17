export function recoverSharedHistory(commits: string[], badCommit: string) {
  // Seeded fault: deleting a shared commit rewrites the evidence trail.
  return commits.filter((commit) => commit !== badCommit);
}
