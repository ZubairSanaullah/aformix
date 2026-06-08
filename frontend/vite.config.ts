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
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router') || id.includes('node_modules/react-helmet-async')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'gsap-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-vendor';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
            return 'icons-vendor';
          }
          if (id.includes('node_modules/sweetalert2')) {
            return 'ui-vendor';
          }
        }
      }
    }
  }
})
