export function providerAction(status: number | "timeout" | "malformed") {
  // Seeded fault: retrying every failure can leak cost and create a retry storm.
  return "retry";
}
