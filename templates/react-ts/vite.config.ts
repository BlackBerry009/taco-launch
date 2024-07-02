import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), UnoCSS(), React()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
