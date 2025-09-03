/**
 * @file The main tsup configuration file. See https://tsup.egoist.dev/ for more information. Tsup is a lightweight bundler with low complexity involving configuration.
 */

/* eslint-disable import/no-nodejs-modules -- disabled */

import path from "node:path";

import { defineConfig } from "tsup";

export default defineConfig({
    cjsInterop: true,
    clean: true,
    dts: { entry: ["src/index.ts"] },
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    minify: process.env.NODE_ENV === "production",
    onSuccess: "echo 'Successfully built!'",
    outDir: "dist/",
    sourcemap: true,
    treeshake: true,
    tsconfig: path.resolve(`${__dirname}`, "tsconfig.json"),
});
