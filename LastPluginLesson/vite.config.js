import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[hash].[name].[ext]',
      }
    }
  },
  plugins: [{
    config (options) {
      console.log('config options执行', options)
    },
    configureServer (server) {
      server.middlewares.use((req, res, next) => {

      })
    },
    transformIndexHtml (html) {
      return html
    },
    configResolved (options) {
      //整个配置文件的解析流程完全结束后执行的钩子
      //vite有很多默认的配置，这个钩子可以获取到所有的配置
      console.log('configResolved options执行', options)
    },
    configurePreviewServer (server) {

    },
    options (rollupOptions) {
      //universal模式下，rollupOptions是一个数组，每个元素都是一个rollup配置
      console.log('rollupOptions', rollupOptions)
    }
  }]
})
//命令行参数 默认的CLI参数