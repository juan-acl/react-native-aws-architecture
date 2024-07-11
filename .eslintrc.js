//const { default: plugin } = require("tailwindcss");

// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        indent: true, // Use Prettier's indent rule
        trailingComma: "es5", // Use Prettier's trailing comma rule
        singleQuote: true, // Use Prettier's single quote rule
        bracketSpacing: true, // Use Prettier's bracket spacing rule
        semi: false, // Use Prettier's semi-colon rule
        arrowParens: "always", // Use Prettier's arrow parens rule
      },
    ],
    indent: ["off", 8], // Disable ESLint's indent rule (Prettier will handle it)
  },
};
