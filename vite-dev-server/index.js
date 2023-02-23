const Koa = require('koa')//不能使用esmodule  必须使用commonjs  koa不是原生的，需要安装，会去node_modules中找
const fs = require('fs') //node环境注入的能力，node原生有fs模块，直接注入到js中
const path = require('path')

//不同的宿主环境会赋予js不同的全局变量
//浏览器环境注入的全局  window   ex:document.getElementById(id名)

const app = new Koa() //const vue=new Vue()

//node最频繁的操作是处理请求和操作文件

//当请求来临以后回直接注入到use注册的函数中
app.use(async (ctx) => { //context 上下文 request -->请求信息 response -->响应信息 get请求  根地址 /
  console.log('ctx', ctx.request, ctx.response)
  //开发的时候用中间件，不用这种形式写
  if (ctx.request.url === '/') {
    //意味着其他人在找我们要根路径的东西，比如访问baidu.com,我们就会返回一个html文件
    console.log('path', path.resolve(__dirname, 'index.html'))
    const indexContent = await fs.promises.readFile(path.resolve(__dirname, 'index.html'))
    //服务端一般不这么用，性能问题
    console.log('indexContent', indexContent.toString())
    ctx.response.body = indexContent //作为响应体发给对应的请求人
    // json --> text/html text/plain text/css text/javascript
    //设置浏览器以html的形式解析
    ctx.response.set('Content-Type', 'text/html')
  }
  //比如后台给我们一个获取用户信息的接口 api/getUserInfo 
  if (ctx.request.url === '/api/getUserInfo') {
    //去数据库找到用户信息返回给前端
  }

  if (ctx.request.url === '/main.js') {
    const mainJsContent = await fs.promises.readFile(path.resolve(__dirname, 'main.js'))
    console.log('mainJsContent', mainJsContent.toString())
    ctx.response.body = mainJsContent
    ctx.response.set('Content-Type', 'text/javascript')
  }
  if (ctx.request.url === '/App.vue') {
    const mainVueContent = await fs.promises.readFile(path.resolve(__dirname, 'App.vue'))
    //如果是vue文件，会做一个字符串替换，mainVueContent.toString().find("<template></template>"),如果体会到了就直接进行字符串替换。
    //AST语法分析=>vue.createElement()-->构建原生dom
    console.log('mainVueContent', mainVueContent.toString())
    ctx.response.body = mainVueContent
    //即使看到了.vue文件，也用js方式去解析
    ctx.response.set('Content-Type', 'text/javascript')
  }

})

app.listen(5173, () => {
  console.log('server is running at http://localhost:5173')
})