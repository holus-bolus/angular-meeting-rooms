module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: [],
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-param-reassign': 'off',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'no-return-assign': ['error', 'always'],
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: true,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],



    "no-console": "warn",
    "no-alert": "error",
    "no-irregular-whitespace": "warn",
    "no-useless-escape": "warn",
    "curly": "error",
    "multiline-ternary": [
      "error",
      "always-multiline"
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "complexity": [
      "error",
      {
        "max": 80
      }
    ],
    "max-len": [
      "error",
      {
        "code": 140,
        "ignorePattern": "^import .*"
      }
    ],
    "semi": "off",
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "no-case-declarations": "warn",
    "ordered-imports": "off",
    "sort-imports": "off",
    "prefer-arrow-callback": "off",
    "no-prototype-builtins": "warn",
    "no-invalid-this": "off",
  },
};
