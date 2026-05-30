import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const src = (p) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Preserve CRA's `baseUrl: src` absolute imports. Array form so the local
  // `redux/` folder alias doesn't shadow the `redux` npm package (bare import).
  resolve: {
    alias: [
      { find: 'App', replacement: src('App.js') },
      { find: 'components', replacement: src('components') },
      { find: '_services', replacement: src('_services') },
      { find: '_helpers', replacement: src('_helpers') },
      { find: 'assets', replacement: src('assets') },
      { find: /^redux\//, replacement: src('redux') + '/' },
    ],
  },
  // The components keep JSX in .js files (CRA allowed this); tell esbuild to
  // treat src .js as JSX. Classic runtime is fine because every file imports React.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  // CRA output dir, so the existing Dockerfile/nginx COPY paths still apply.
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    host: true,
    watch: { usePolling: true },
  },
});
