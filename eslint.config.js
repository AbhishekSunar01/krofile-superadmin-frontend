// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config({
//   extends: [js.configs.recommended, ...tseslint.configs.recommended],
//   files: ['**/*.{ts,tsx}'],
//   ignores: ['dist'],
//   languageOptions: {
//     ecmaVersion: 2020,
//     globals: globals.browser,
//   },
//   plugins: {
//     'react-hooks': reactHooks,
//     'react-refresh': reactRefresh,
//   },
//   rules: {
//     ...reactHooks.configs.recommended.rules,
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
// })

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: 2020,
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist", ".eslintrc.js"],
  languageOptions: {
    globals: globals.browser,
  },
  plugins: {
    "@typescript-eslint": tseslint,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    prettier: require("eslint-plugin-prettier"),
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
});
