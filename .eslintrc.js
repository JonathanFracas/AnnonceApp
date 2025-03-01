// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "warn",
    "no-unused-vars": "warn",
    semi: ["error", "always"],
    "arrow-parens": ["error", "always"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "react/no-unescaped-entities": ["error", { forbid: [">", "<"] }],
  },
  ignorePatterns: ["/dist/*"],
};
