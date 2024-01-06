import { defineConfig } from 'cypress';

const setupNodeEvents = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
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
