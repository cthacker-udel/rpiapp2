const { execSync } = require("child_process");
const packageJson = require("./package.json");

const version = packageJson.version;
const filename = `rpi-app-${version}.tgz`;

console.log(`Publishing ${filename}...`);

execSync(`npm publish ${filename}`, { stdio: "inherit" });
