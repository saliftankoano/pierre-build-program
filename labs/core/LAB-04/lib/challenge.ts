export function mayReachBrowser(variableName: string) {
  // Seeded fault: every environment value is treated as browser-safe.
  return variableName.length > 0;
}
