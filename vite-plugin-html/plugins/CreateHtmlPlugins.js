module.exports = (options) => {
  /**
   * @see  https://cn.vitejs.dev/guide/api-plugin.html#transformindexhtml
   */

  return {
    // 转换html的
    //将我们插件的一个执行时机提前
    transformIndexHtml: (html) => {
      console.log('html', html)
      return html.replace(/<%= title %>/g, options.inject.data.title)
    }
  }
}