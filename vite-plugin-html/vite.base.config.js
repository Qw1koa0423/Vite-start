import { defineConfig } from 'vite'
// import { createHtmlPlugin } from 'vite-plugin-html'
import MyHtmlPlugins from './plugins/CreateHtmlPlugins'
export default defineConfig({

  plugins: [
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       title: '首页',
    //     }
    //   }
    // })
    MyHtmlPlugins({
      inject: {
        data: {
          title: '主页',
        }
      }
    })
  ],
})