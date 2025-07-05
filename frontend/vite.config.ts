import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Gestion-de-Campeonato-Futbol/',  // Esta línea es CLAVE
});
