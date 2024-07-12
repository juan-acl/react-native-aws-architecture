module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    "expo",
    "prettier"
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    "indent": ["error", 4],
  },
};