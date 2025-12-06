import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: { port: 5173 },
    build: {
      // Dikontrol lewat .env.* agar fleksibel:
      // - .env.development → VITE_SOURCEMAP=true
      // - .env.production  → VITE_SOURCEMAP=false
      sourcemap: env.VITE_SOURCEMAP === 'true',
      rollupOptions: {
        output: {
          manualChunks: {
            // Heavy library used only for SQL formatting – keep out of the
            // main entry bundle so initial JS load is lighter.
            sqlFormatter: ['sql-formatter']
          }
        }
      }
    }
  }
})
