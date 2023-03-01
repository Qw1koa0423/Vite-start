import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import path from 'path'
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          //ts 认为你这个当前环境不在es6以后
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
      input: {
        main: path.resolve(__dirname, './index.html'),
        product: path.resolve(__dirname, './product.html'),
      },
    },
  },
  plugins: [
    checker({
      typescript: true,
    }),
  ],
})
