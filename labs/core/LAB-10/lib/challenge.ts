export type Signal = { kind: "authorization" | "freshness" | "webhook" | "preview"; severity: number };

export function triage(signals: Signal[]) {
  // Seeded fault: arrival order is mistaken for risk priority.
  return signals;
}
