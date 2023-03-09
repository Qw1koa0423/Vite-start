import { defineConfig } from 'vite'
import myViteAliases from './plugins/viteAliases'
export default defineConfig({

  plugins: [
    myViteAliases(),
  ],
})