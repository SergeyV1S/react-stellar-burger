module.exports = {
  root: true,
  env: { browser: true, es2020: true, "jest/globals": true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:react/jsx-runtime",
    "plugin:cypress/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react", "@typescript-eslint", "jest", "cypress"],
  root: true,
  rules: {
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-var": "error",
    "no-console": "warn",
    "no-shadow": "error",
    "@typescript-eslint/no-empty-interface": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",
    "arrow-body-style": ["error", "as-needed"],
    "react-hooks/exhaustive-deps": "off",
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports"
      }
    ],
    "no-restricted-imports": [
      "warn",
      {
        patterns: ["../../"]
      }
    ]
  }
};
