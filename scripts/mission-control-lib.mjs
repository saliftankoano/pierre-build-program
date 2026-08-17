const mentorGates = new Set([4, 8, 10, 11]);

function labelsOf(item) {
  return new Set((item.labels ?? []).map((label) => typeof label === "string" ? label : label.name));
}

export function missionControlBody(packets, issues, pullRequests, repo = "OWNER/pierre-build-program") {
  const states = packets.map((packet) => {
    const milestoneLabel = `milestone-${packet.milestone}`;
    const work = issues.filter((issue) => labelsOf(issue).has(milestoneLabel) && !labelsOf(issue).has("mission-control"));
    const acceptedPr = pullRequests.find((pr) => pr.mergedAt && pr.title.startsWith(`Milestone ${packet.milestone}`) && labelsOf(pr).has("milestone-accepted"));
    const closed = work.filter((issue) => issue.state === "CLOSED").length;
    const blocked = work.filter((issue) => labelsOf(issue).has("blocked")).length;
    const evidenceReady = work.filter((issue) => labelsOf(issue).has("evidence-ready")).length;
    let status = "locked";
    if (acceptedPr) status = "accepted";
    else if (blocked) status = "blocked";
    else if (work.length && closed === work.length) status = "evidence";
    else if (work.length) status = "active";
    return { packet, work, closed, blocked, evidenceReady, acceptedPr, status };
  });

  const completedHours = states.filter((state) => state.status === "accepted").reduce((sum, state) => sum + state.packet.hours, 0);
  const active = states.find((state) => ["active", "blocked", "evidence"].includes(state.status));
  const nextLocked = states.find((state) => state.status === "locked");
  const nextOpenIssue = active?.work.find((issue) => issue.state !== "CLOSED" && !labelsOf(issue).has("blocked"));
  const nextAction = active?.status === "blocked"
    ? `Resolve or escalate the blocked milestone ${active.packet.milestone} work with redacted evidence.`
    : active?.status === "evidence"
      ? `Open the Milestone ${active.packet.milestone} evidence PR and complete its Codex defense${mentorGates.has(active.packet.milestone) ? " plus mentor review" : ""}.`
      : nextOpenIssue
        ? `Continue ${nextOpenIssue.title}.`
        : nextLocked?.packet.milestone === 0
          ? "Run the Start Pierre Build Program workflow to release Milestone 0 and LAB-00."
          : nextLocked
            ? `Complete and merge the accepted Milestone ${nextLocked.packet.milestone - 1} PR to release Milestone ${nextLocked.packet.milestone}.`
          : "All milestone packets are accepted. Verify the graduation rubric and final handoff.";

  const nodes = states.map(({ packet, status, closed, work }) => `M${packet.milestone}["M${packet.milestone} · ${packet.hours}h<br/>${packet.title}<br/>${closed}/${work.length} issues"]:::${status}`).join("\n    ");
  const edges = states.slice(0, -1).map((state, index) => `M${index} --> M${index + 1}`).join("\n    ");
  const rows = states.map(({ packet, status, closed, work, blocked, evidenceReady }) => {
    const gate = mentorGates.has(packet.milestone) ? "Mentor" : "Codex + CI";
    return `| ${packet.milestone} | ${packet.title} | ${packet.hours}h | ${status} | ${closed}/${work.length} | ${blocked} | ${evidenceReady} | ${gate} |`;
  }).join("\n");

  const repositoryFiles = `https://github.com/${repo}/blob/main`;

  return `# Pierre Build Program Mission Control

> This issue is generated from released curriculum issues and accepted milestone pull requests. Do not store credentials, employer details, client data, or forensic evidence here.

## Current position

- **Accepted core time:** ${completedHours}/178 hours
- **Next action:** ${nextAction}
- **Evidence rule:** CI proves behavior; your trace, controlled modification, and Codex defense prove comprehension.
- **Help route:** Give the recommended issue URL to Codex and use the prompt in [the learning-partner playbook](${repositoryFiles}/playbooks/codex-learning-partner.md). Begin from [START_HERE](${repositoryFiles}/START_HERE.md) if onboarding is incomplete.

\`\`\`mermaid
flowchart LR
    ${nodes}
    ${edges}

    classDef locked fill:#e5e7eb,stroke:#6b7280,color:#111827;
    classDef active fill:#dbeafe,stroke:#2563eb,color:#172554,stroke-width:2px;
    classDef blocked fill:#fee2e2,stroke:#dc2626,color:#450a0a,stroke-width:2px;
    classDef evidence fill:#fef3c7,stroke:#d97706,color:#451a03,stroke-width:2px;
    classDef accepted fill:#dcfce7,stroke:#16a34a,color:#052e16,stroke-width:2px;
\`\`\`

**Status key:** gray = locked · blue = active · red = blocked · amber = evidence/PR ready · green = accepted. Text labels repeat every color meaning.

## Milestone evidence dashboard

| Milestone | Assignment | Time | Status | Closed issues | Blocked | Evidence ready | Review |
| ---: | --- | ---: | --- | ---: | ---: | ---: | --- |
${rows}

## Standard lab loop

1. Predict the responsible layer and expected evidence.
2. Build the smallest accepted behavior.
3. Activate the synthetic incident.
4. Diagnose, disprove an alternative, and state blast radius.
5. Repair, run checks, and inspect the diff.
6. Complete the Codex defense and postmortem.

Run **Actions → Refresh Mission Control** if the dashboard does not yet reflect a recent manual change.`;
}
