//预设环境包含很多的插件
//语法降级=>postcss-low-level
//编译插件=>postcss-compiler
//...
const postcssPresetEnv = require('postcss-preset-env')
//帮我们语法降级
//预设就是帮你一次性把这些必要的插件都给撞上了
//做语法编译 less语法 sass语法  (语法嵌套 函数 变量) postcss 插件
module.exports = {
  plugins: [postcssPresetEnv(/*pluginOptions */)]
}