export function processWebhook(seen: Set<string>, eventId: string, payloadText: string) {
  // Seeded fault: effects happen before duplicate detection and payload text becomes instruction.
  seen.add(eventId);
  return { effects: 1, payloadIsInstruction: payloadText.length > 0 };
}
