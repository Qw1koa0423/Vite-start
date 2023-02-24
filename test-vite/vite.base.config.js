import { defineConfig } from 'vite'

// const postcssPresetEnv = require('postcss-preset-env')

export default defineConfig({
  //对css行为进行配置
  css: {
    //对css模块化默认行为进行配置
    //modules配置最终会丢给postcss modules
    modules: {
      //修改生成对象的key的展示形式(驼峰|中划线)
      localsConvention: 'camelCaseOnly',
      //配置当前的模块化行为是模块化还是全局化(有hash就是开启了模块化的一个标志，因为他可以产生不同的hash值来控制我们样式类名不被覆盖)
      scopeBehaviour: 'local',
      // /**
      //  * @see https://github.com/webpack/loader-utils#interpolatename
      //  */
      // // generateScopedName: '[name]_[local]_[hash:5]',
      // generateScopedName: (name, filename, css) => {
      //   // 输出在node
      //   // name=> 代表此时css文件的类名
      //   // filename=> 代表此时css文件的路径
      //   // css=>  代表此时css文件的内容
      //   console.log('name', name, 'filename', filename, 'css', css)
      //   //配置成函数以后，返回值决定了他最终显示的类型
      //   return `${name}_${Math.random().toString(36).substring(3, 8)}`
      // },
      // 生成hash会根据你的类名 + 一些其他的字符串(文件名 + 他内部随机生成一个字符串)去进行生成, 如果你想要你生成hash更加的独特一点, 你可以配置hashPrefix, 你配置的这个字符串会参与到最终的hash生成, （hash: 只要你的字符串有一个字不一样, 那么生成的hash就完全不一样, 但是只要你的字符串完全一样, 生成的hash就会一样）
      hashPrefix: "hello",
      globalModulePaths: ['./componentB.module.css'] //代表不想参与到css模块化的路径
    },
    preprocessorOptions: {//key + config  key代表你想要使用的预处理器的名字, config代表你想要配置的内容
      less: {//整个配置对象都会最终给到less的执行参数(全局参数)中去
        math: 'always',
        globalVars: {//全局变量
          maincolor: 'red'
        }
      },
    },
    devSourcemap: true,//是否生成sourcemap(文件索引)
    // postcss: {
    //   plugins: [postcssPresetEnv()]
    // },
  }
})