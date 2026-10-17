import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The zine is a self-contained static export with its own browser script.
    "public/creative/theory-and-culture-zine/reader/**",
    // Interactive Boxes is a self-contained p5.js sketch.
    "public/creative/interactive-boxes/**",
  ]),
]);

export default eslintConfig;
