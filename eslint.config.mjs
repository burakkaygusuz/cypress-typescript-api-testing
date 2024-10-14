import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  pluginCypress.configs.globals,
  pluginCypress.configs.recommended,
  pluginChaiFriendly.configs.recommendedFlat
];
