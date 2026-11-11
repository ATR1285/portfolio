import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset paths keep this build portable across Vercel, Netlify and GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
});
