/**
 * @file Represents the release-it configuration, which is an easy way to publish github releases and npm releases as well.
 * @see https://github.com/release-it/release-it - For the base github repository which this configuration file is for
 * @see https://github.com/release-it/conventional-changelog - For the plugin used in this configuration file which essentially adds extensive notes to the published github release.
 */

/* eslint-disable quotes -- disabled for this. */
/* eslint-disable no-template-curly-in-string -- disabled, release-it uses handlebar syntax, so inline brackets required. */
/* eslint-disable more/no-hardcoded-configuration-data -- disabled, there is no hard-coded configuration data. */

import type { Config } from "release-it";

export default {
    git: {
        commitMessage: "chore: release v${version}",
        tagName: "v${version}",
    },
    github: {
        assets: ["./rpi-app-${version}.tgz", "docs.zip"],
        release: true,
        releaseName: "Release ${version}",
        tokenRef: "GITHUB_TOKEN",
    },
    hooks: {
        "after:bump": "npm pack",
        "after:release": "rimraf --glob rpi-app-*.tgz",
        "before:git:init": "npm run docs",
        "before:init": "npx tsup",
    },
    npm: { publish: true },
    plugins: {
        "@release-it/conventional-changelog": {
            infile: "CHANGELOG.md",
            preset: {
                name: "conventionalcommits",
                types: [
                    { section: "Features", type: "feat" },
                    { section: "Bug Fixes", type: "fix" },
                    { section: "Performance Improvements", type: "perf" },
                    {
                        hidden: false,
                        section: "Build Improvements",
                        type: "build",
                    },
                    { hidden: false, section: "Chores", type: "chore" },
                    {
                        hidden: false,
                        section: "Continuous Integration",
                        type: "ci",
                    },
                    { hidden: true, section: "Documentation", type: "docs" },
                    { hidden: false, section: "Refactoring", type: "refactor" },
                    {
                        hidden: false,
                        section: "Styling Updates",
                        type: "style",
                    },
                    { hidden: false, section: "Testing", type: "test" },
                ],
            },
        },
    },
} satisfies Config;
