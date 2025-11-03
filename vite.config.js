import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Vite base must be the repository name with leading and trailing slashes
  // so assets are served from https://<user>.github.io/<repo>/ on GitHub Pages
  base: "/react-weather-app/",
  plugins: [react()],
})
