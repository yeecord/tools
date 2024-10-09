import tsParser from "@typescript-eslint/parser";
import parser from "astro-eslint-parser";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["**/*.astro"],

    plugins: {
      astro,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...astro.environments.astro.globals,
      },

      parser: parser,
      ecmaVersion: 5,
      sourceType: "commonjs",

      parserOptions: {
        extraFileExtensions: [".astro"],
      },
    },

    rules: {
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
    },
  },
  {
    files: ["**/*.astro/*.js", "*.astro/*.js"],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      "prettier/prettier": "off",
    },
  },
];
