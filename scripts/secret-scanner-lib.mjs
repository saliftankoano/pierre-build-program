export const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ["GitHub token", /gh[pousr]_[A-Za-z0-9]{30,}/g],
  ["OpenAI-style key", /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/g],
  ["Slack token", /xox[baprs]-[A-Za-z0-9-]{20,}/g],
  ["AWS access key", /AKIA[0-9A-Z]{16}/g],
  ["assigned secret", /(?:API_KEY|SECRET_KEY|ACCESS_TOKEN|SERVICE_ROLE_KEY)\s*=\s*["']?(?!(?:YOUR_|EXAMPLE_|SYNTHETIC_|PLACEHOLDER|<))[A-Za-z0-9_./+=-]{16,}/gi]
];

export function secretFindings(content) {
  const findings = [];
  for (const [name, pattern] of secretPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) findings.push(name);
  }
  return findings;
}
