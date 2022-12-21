import type { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://magento.softwaretestingboard.com/',
    browserName: 'chromium',
    headless: true,
    trace: 'on',
  },
  timeout: 60000,
  workers: 1, // All tests are run one by one
  reporter: [['html', { outputFolder: 'test-results/test-report' }]],
};
export default config;