import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ⬅️ RE-ADD THIS LINE
  base: "react-weather-app", 
  plugins: [react()],
})
