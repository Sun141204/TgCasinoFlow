import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

export default defineConfig({
  testDir: './tests',            // your test files location
  timeout: 60_000,               // max test time in ms
  expect: {
    timeout: 5_000,              // max expect time
  },
  retries: 1,                     // retry failed tests once
  reporter: [['list'], ['html']], // console list + HTML report
  use: {
    baseURL: process.env.BASE_URL, // environment variable from .env
    headless: true,                // set false if you want headed mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
