import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { UserConfigExport } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // Enables global test functions like describe, test, expect
    environment: 'jsdom',   // Simulates a browser-like environment
    setupFiles: './setupTests.ts' // Loads setup for Jest DOM matchers
  },
} as UserConfigExport) // Explicitly define the type
