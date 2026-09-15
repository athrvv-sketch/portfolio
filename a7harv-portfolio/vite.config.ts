import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) return 'motion'
        },
      },
    },
  },
})
