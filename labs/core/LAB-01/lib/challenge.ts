export function diagnosticLine(lines: string[]) {
  // Seeded fault: the final generic line hides the first actionable cause.
  return lines.at(-1) ?? "no evidence";
}
