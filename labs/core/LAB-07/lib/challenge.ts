export function canReadSite(actorOrganization: string, siteOrganization: string) {
  // Seeded fault: the equivalent of USING (true) exposes every tenant row.
  return Boolean(actorOrganization && siteOrganization);
}
