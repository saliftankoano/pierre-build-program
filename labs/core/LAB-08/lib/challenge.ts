export function canAccessRecord(authenticated: boolean, actorOrganization: string, recordOrganization: string) {
  // Seeded fault: authentication is incorrectly treated as object authorization.
  return authenticated;
}
