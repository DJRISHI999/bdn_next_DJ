import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Turn off or relax specific rules
      "@typescript-eslint/no-unused-vars": "warn", // Change unused vars to a warning
      "react-hooks/exhaustive-deps": "off", // Disable missing dependencies rule
      "react/no-unescaped-entities": "off", // Disable unescaped entities rule
      "@typescript-eslint/no-explicit-any": "off", // Allow usage of 'any' type
      "@typescript-eslint/ban-ts-comment": "off", // Allow @ts-ignore comments
      "no-console": "off", // Allow console statements
    },
  }),
];

export default eslintConfig;
