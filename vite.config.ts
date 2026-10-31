import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Use /Natalia-Stachowiak/ for GitHub Pages builds, '/' for local dev and standard preview
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.BASE_PATH === '/Natalia-Stachowiak/';
  const base = isGitHubPages ? '/Natalia-Stachowiak/' : '/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
