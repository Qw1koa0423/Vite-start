import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
import myViteAliases from './plugins/viteAliases'
export default defineConfig({

  plugins: [
    // ViteAliases({
    //   prefix: '@',
    // }),
    myViteAliases(),
  ],
})