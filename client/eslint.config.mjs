import js from "@eslint/js"
import globals from "globals"
import pluginReact from "eslint-plugin-react"
import pluginPrettier from "eslint-plugin-prettier"
import configPrettier from "eslint-config-prettier"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      "@typescript-eslint": tseslint,
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
      tseslint.configs.recommended,
      configPrettier,
    ],
    rules: {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": ["error"],
    },
  },
])
