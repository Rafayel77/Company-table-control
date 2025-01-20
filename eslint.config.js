import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'indent': ['error', 2],
      'semi': ['error', 'always'],
    },
  },
]);
