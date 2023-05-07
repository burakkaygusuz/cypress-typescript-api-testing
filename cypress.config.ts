import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

const setupNodeEvents = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('file:preprocessor', createBundler());
  return config;
};

export default defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    responseTimeout: 30000,
    video: false,
    env: {
      username: 'admin',
      password: 'password123',
    },
    setupNodeEvents,
  },
});
