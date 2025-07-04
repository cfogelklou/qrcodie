/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/qrcodie/', // Set the base path for hosting in a subdirectory
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'QRCodie',
        short_name: 'QRCodie',
        description: 'A simple intermittent-fasting PWA.',
        start_url: '.',
        display: 'standalone',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/qrcodie/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/qrcodie/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/qrcodie/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true, // Optional: makes Vitest globals available without importing
    environment: 'jsdom', // Use jsdom to simulate DOM environment
    setupFiles: './src/setupTests.ts', // Optional: if you need setup files
  },
});
