export const requiredEvidenceHeadings = [
  "Pre-change prediction",
  "Build behavior",
  "Request and system trace",
  "Incident evidence",
  "Root cause and blast radius",
  "Repair and regression",
  "Prevention and limitations",
  "Codex defense",
  "Postmortem"
];

export function evidenceErrors(content, id) {
  const errors = [];
  if (!new RegExp(`^# ${id} evidence\\s*$`, "m").test(content)) errors.push(`expected top-level heading '# ${id} evidence'`);
  for (const heading of requiredEvidenceHeadings) {
    if (!new RegExp(`^## ${heading}\\s*$`, "m").test(content)) errors.push(`missing section '## ${heading}'`);
  }
  return errors;
}
