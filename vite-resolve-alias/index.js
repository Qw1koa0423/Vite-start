const Koa = require('koa')
const fs = require('fs')
const path = require('path')


const viteConfig = require('./vite.config')
const aliasResolver = require('./aliasResolver')

console.log('viteConfig', viteConfig)

const app = new Koa()

app.use(async (ctx) => {
  console.log('ctx', ctx.request, ctx.response)
  if (ctx.request.url === '/') {
    const indexContent = await fs.promises.readFile(path.resolve(__dirname, 'index.html'))
    ctx.response.body = indexContent
    ctx.response.set('Content-Type', 'text/html')
  }
  //如果当前url是以js后缀结尾的
  if (ctx.request.url.endsWith(".js")) {
    console.log('path.resolve(__dirname, ctx.request.url)', path.resolve(__dirname, '.' + ctx.request.url))
    const JsContent = await fs.promises.readFile(path.resolve(__dirname, '.' + ctx.request.url))
    console.log('JsContent', JsContent)
    //进行alias替换
    const lastResult = aliasResolver(viteConfig.resolve.alias, JsContent.toString())
    ctx.response.body = lastResult
    ctx.response.set('Content-Type', 'text/javascript')
  }

})

app.listen(5173, () => {
  console.log('server is running at http://localhost:5173')
})