/**
 * Commitlint config — mirrors the existing scope-tagged convention.
 * Examples that already pass: "feat(voice): DR-710 5 approved tools"
 *                             "fix(claim): DR-542 distressed-user protocol fixes"
 *                             "docs(audits): DR-628 innerHTML security + DR-653 frontend sweep"
 *                             "security(foundation-day0): gitleaks CI + env hygiene"
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'security',
      ],
    ],
    'subject-case': [0], // allow any case in subject
    'header-max-length': [1, 'always', 120], // warn only — some DR messages are longer
    'body-max-line-length': [0], // disabled — bodies have long URLs + code blocks
    'footer-max-line-length': [0],
  },
};
