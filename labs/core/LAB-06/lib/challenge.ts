export function displayedHealth(providerAvailable: boolean, cacheAgeMinutes: number) {
  // Seeded fault: expired cached data is always shown as current operational truth.
  return { label: "Operational", stale: false, ageMinutes: cacheAgeMinutes };
}
