module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/eslint-recommended'],
      rules: {
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {ignoreParameters: true},
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',

        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-invalid-this": [
          "warn"
        ],
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            "allowExpressions": true
          }
        ],
        "@typescript-eslint/member-ordering": [
          "warn",
          {
            "default": {
              "memberTypes": [
                "public-decorated-field",
                "public-field",
                "protected-decorated-field",
                "protected-field",
                "private-decorated-field",
                "private-field",
                "public-method",
                "protected-method",
                "private-method"
              ],
              "order": "as-written"
            }
          }
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/semi": [
          "error"
        ],
      },
    }
  ],
};
