import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [viteCompression()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/vite/',
  plugins: [vue(), viteCompression()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
