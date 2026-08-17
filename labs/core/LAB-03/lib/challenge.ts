export function contentWidth(viewport: number) {
  // Seeded fault: fixed content width overflows narrow viewports.
  return Math.max(640, viewport);
}
