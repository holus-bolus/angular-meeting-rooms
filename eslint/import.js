module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    '@typescript-eslint',
    'simple-import-sort',
    'eslint-plugin-import',
  ],
  rules: {
    'import/exports-last': 'off',
    'import/no-default-export': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-webpack-loader-syntax': 'off',
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/consistent-type-imports': 'off',
    "import/no-self-import": "error",
    "import/no-unresolved": "off",
    "simple-import-sort/exports": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "ignore"
      }
    ],
    "import/first": "error",
    "import/no-duplicates": "error",
  },
};
