import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permet le déploiement dans des sous-dossiers ou l'ouverture locale relative
  build: {
    assetsDir: 'assets',
  }
})
