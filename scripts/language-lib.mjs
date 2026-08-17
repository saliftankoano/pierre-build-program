const thirdPersonPatterns = [
  ["third-person Pierre instruction", /\bPierre (?:does|is|must|should|will|works|reviews|predicts|remains|saves|learns|has|can)\b/i],
  ["third-person Pierre possessive", /\bPierre['’]s (?:intent|existing|own|computer|infrastructure)\b/i],
  ["generic learner reference", /\b(?:the|a) learner\b/i],
  ["learner-fork reference", /\blearner(?:'s|’s) fork\b/i],
  ["learner-changes reference", /\blearner changes\b/i],
  ["learner-created reference", /\bLearner-created\b/],
  ["third-person pronoun instruction", /\bHe (?:does|must|should|will|can|learns|reviews|explains|traces)\b/]
];

export function directAddressFindings(content) {
  return thirdPersonPatterns.filter(([, pattern]) => pattern.test(content)).map(([name]) => name);
}
