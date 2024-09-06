module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['prefer-arrow'],
      rules: {
        "prefer-arrow/prefer-arrow-functions": [
          "error",
          {
            "disallowPrototype": true,
            "singleReturnOnly": true,
            "classPropertiesAllowed": false,
            "allowStandaloneDeclarations": true
          }
        ],
      },
    }
  ]
};
