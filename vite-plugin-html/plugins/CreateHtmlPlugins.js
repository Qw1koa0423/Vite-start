module.exports = (options) => {
  /**
   * @see  https://cn.vitejs.dev/guide/api-plugin.html#transformindexhtml
   */

  return {
    // 转换html的
    //将我们插件的一个执行时机提前
    transformIndexHtml: (html, ctx) => {
      enforce: 'pre',
        // ctx 表示当前整个请求的一个执行上下文  
        console.log('html', html)
      return html.replace(/<%= title %>/g, options.inject.data.title)
    }
  }
}