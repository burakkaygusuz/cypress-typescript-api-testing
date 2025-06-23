import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import pluginCypress from 'eslint-plugin-cypress';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  tseslint.configs.recommended,
  pluginCypress.configs.recommended,
  pluginChaiFriendly.configs.recommendedFlat,
  {
    rules: {
      'cypress/no-unnecessary-waiting': 'off'
    }
  }
]);
