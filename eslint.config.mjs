import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginCypress.configs.globals,
  pluginCypress.configs.recommended,
  pluginChaiFriendly.configs.recommendedFlat
];
