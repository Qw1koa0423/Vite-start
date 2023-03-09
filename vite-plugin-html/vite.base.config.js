import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
// import MyHtmlPlugin from './plugins/CreateHtmlPlugins'
export default defineConfig({
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          title: '首页1',
        }
      }
    })
  ],
})