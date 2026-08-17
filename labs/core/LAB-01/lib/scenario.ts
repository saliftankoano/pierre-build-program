export type LabMode = "normal" | "incident";
export type LabResult = { state: "operational" | "unhandled" | "recovered"; label: string; message: string; customerSafe: boolean; evidence: string[] };

export function resolveScenario(mode: LabMode): LabResult {
  if (mode === "normal") {
    return { state: "operational", label: "Operational", message: "The build assignment is ready for verification.", customerSafe: true, evidence: ["normal-state check passed"] };
  }

  // Seeded fault: replace this generic response with a bounded recovery for this lab.
  return { state: "unhandled", label: "Incident active", message: "The failure is visible, but no safe recovery has been implemented.", customerSafe: false, evidence: [] };
}
