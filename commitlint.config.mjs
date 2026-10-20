/**
 * Conventional Commits — https://www.conventionalcommits.org
 * Story IDs (e.g. APW-011) go in the footer: "Refs: APW-011".
 * @type {import('@commitlint/types').UserConfig}
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [1, "always", 100],
    "footer-max-line-length": [0],
  },
};

export default config;
