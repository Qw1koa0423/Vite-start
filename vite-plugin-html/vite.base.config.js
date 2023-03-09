import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
export default defineConfig({
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          title: '首页',
        }
      }
    })
  ],
})