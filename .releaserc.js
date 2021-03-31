module.exports = {
  "branch": "main",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json",
          "CHANGELOG.md"
        ],
        "message": "chore(release): 🤖 ${nextRelease.version} [ci skip]"
      }
    ],
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
  "preset": "angular"
}
