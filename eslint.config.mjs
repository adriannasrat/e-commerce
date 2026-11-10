import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// Lints the storefront. The hook rules match what Create React App enforced.
export default defineConfig([
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended],
  },
  {
    files: ["src/**/*.test.{js,jsx,ts,tsx}", "src/setupTests.js"],
    languageOptions: { globals: globals.vitest },
  },
]);
