module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb-base',
      'airbnb-typescript/base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json'
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": [2],
      "@typescript-eslint/indent": [0],
      '@typescript-eslint/indent': 'off',
       'import/prefer-default-export': 'off',
       'max-classes-per-file': 'off',
       'max-len': 'off',
       'no-underscore-dangle': 'off'
    },
  };