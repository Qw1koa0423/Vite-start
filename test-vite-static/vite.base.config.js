import { defineConfig } from 'vite'
import path from 'path'
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@assets": path.resolve(__dirname, './src/assets'),
    }
    //原理：服务端读到@的时候，会去找到@对应的路径，然后把@替换成对应的路径
  },
  build: {//构建生产包的配置
    rollupOptions: {//配置rollup的选项
      /**
       * @see https://www.rollupjs.com/guide/big-list-of-options#outputchunkfilenames
       */
      output: {//配置rollup输出的选项
        //在rollup里，hash代表将你的文件名喝文件内容进行组合计得来的结果
        assetFileNames: "[hash].[name].[ext]",
      },
    },
    assetsInlineLimit: 4096000,//默认是4096，代表的是小于4kb的文件会被转换成base64的格式
    outDir: "dist",//默认是dist  打包后的文件夹名字
    assetsDir: "static",//默认是assets  静态资源文件夹
    emptyOutDir: true,//默认是false  打包前是否清空dist文件夹
  }
})