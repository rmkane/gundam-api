module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'prettier/prettier': ['error', { singleQuote: true }],
    'simple-import-sort/imports': ['error', {
      groups: [
        ['^@?\\w'],
        ['@/(.*)'],
        ['^[./]']
      ]
    }]
  },
  globals: {
    module: true,
  },
  settings: {},
};
