import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path для статики.
//   VITE_BASE='/' — для собственного сервера vsebank.space (корневой путь)
//   не задан — для GitHub Pages по умолчанию /VseBank/
// На сервере сооснователь собирает либо `VITE_BASE=/ npm run build`,
// либо `npm run build -- --base=/` (флаг переопределяет env).
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/VseBank/',
})
