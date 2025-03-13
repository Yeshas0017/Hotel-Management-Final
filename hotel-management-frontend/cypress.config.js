import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',  // Directory to save the test results
      overwrite: true,               // Overwrite previous reports
      html: true,                    // Generate HTML report
      json: true,                    // Generate JSON report
    },
  },
});
