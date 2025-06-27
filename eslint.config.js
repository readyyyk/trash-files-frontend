// @ts-check

import eslint from "@eslint/js";
import * as prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        files: [
            "**/*.js",
            "**/*.mjs",
            "**/*.cjs",
            "**/*.jsx",
            "**/*.ts",
            "**/*.mts",
            "**/*.cts",
            "**/*.tsx",
        ],
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
                project: "./tsconfig.json",
            },
            globals: {
                React: "readonly",
            },
        },
        plugins: {
            "react": reactPlugin,
            "react-hooks": reactHooksPlugin,
            "prettier": prettierPlugin,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            // React rules
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...prettier.rules,
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "error",
            "react/jsx-sort-props": [
                "warn",
                {
                    noSortAlphabetically: false,
                    shorthandFirst: true,
                    multiline: "last",
                    ignoreCase: true,
                    // reservedFirst: [],
                    locale: "auto",
                },
            ],
            "simple-import-sort/imports": ["warn", {}],
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
            reportUnusedInlineConfigs: "error",
            noInlineConfig: false,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
);
