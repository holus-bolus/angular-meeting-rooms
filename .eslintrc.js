module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '**/node_modules/**',
    '.eslintrc.js',
    '**/*.d.ts',
    '**/dist/**',
    '.cache/**',
    '.git/**',
    '.idea/**',
    '**/*.js'
  ],
  globals: {},
  plugins: [
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.eslint.json',
  },
  extends: [
    './eslint/index',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [

  ],
};
