import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
    plugins: { prettier: prettierPlugin },
    extends: [js.configs.recommended],
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
