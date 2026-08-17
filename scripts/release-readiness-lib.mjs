export function incompleteStoryIds(packet, issues) {
  return packet.stories.filter((story) => {
    const issue = issues.find((candidate) => candidate.title.includes(`[${story.id}]`));
    return !issue || issue.state !== "CLOSED";
  }).map((story) => story.id);
}

export function closedMentorReview(packet, issues) {
  if (!packet.mentorGate) return undefined;
  return issues.find((issue) => issue.title.startsWith(`[MENTOR] Milestone ${packet.milestone}:`) && issue.state === "CLOSED");
}

export function hasMentorApproval(text) {
  return /Decision:\s*Approved/i.test(text);
}
