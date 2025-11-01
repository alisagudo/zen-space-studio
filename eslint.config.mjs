import js from "@eslint/js"
import globals from "globals"
import pluginReact from "eslint-plugin-react"
import pluginPrettier from "eslint-plugin-prettier"
import configPrettier from "eslint-config-prettier"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
      configPrettier,
    ],
    rules: {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: false,
          printWidth: 100,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
])
