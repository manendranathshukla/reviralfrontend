import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lottie-web': 'lottie-web/build/player/lottie_light',
    },
  },
  esbuild: {
    logOverride: {
      'css-syntax-error': 'silent',
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion', 'lottie-react', 'lottie-web'],
          'vendor-ui': ['swiper', 'react-countup', 'axios'],
        },
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
