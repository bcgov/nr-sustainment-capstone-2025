import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'build-html',
      apply: 'build',
      transformIndexHtml: (html) => {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: {
                src: '/env.js',
              },
              injectTo: 'head',
            },
          ],
        }
      },
    },
    react()
  ],
    server: {
    // port: parseInt(process.env.VITE_PORT) || 3001,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
      },
    },
    watch: {
      ignored: ['**/coverage/**', '**/playwright-report/**'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
    },
  }
})
