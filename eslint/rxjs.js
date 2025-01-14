module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['rxjs'],
      extends: ['plugin:rxjs/recommended'],
      rules: {
        "rxjs/no-async-subscribe": "error",
        "rxjs/no-create": "error",
        "rxjs/no-ignored-notifier": "error",
        "rxjs/no-ignored-replay-buffer": "error",
        "rxjs/no-ignored-takewhile-value": "error",
        "rxjs/no-index": "error",
        "rxjs/no-internal": "error",
        "rxjs/no-nested-subscribe": "error",
        "rxjs/no-redundant-notify": "error",
        "rxjs/no-subject-unsubscribe": "error",
        "rxjs/no-unsafe-subject-next": "error",
        "rxjs/no-unsafe-takeuntil": "error",
      },
    }
  ]
};
