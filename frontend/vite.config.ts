import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'rolldown/parseAst': 'rolldown/dist/parse-ast-index.mjs',
      'react-router-dom': 'react-router-dom/dist/index.mjs',
    },
  },
  // let Vite handle dependency optimization automatically
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router', 'react-router-dom', 'react-helmet-async'],
          'gsap-vendor': ['gsap', '@gsap/react'],
          'ui-vendor': ['lucide-react', 'react-icons', 'framer-motion', 'sweetalert2']
        }
      }
    }
  }
})
