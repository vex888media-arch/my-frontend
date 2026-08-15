import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {}
    }
  },
  build: {
    cssMinify: 'esbuild'
  }
})
