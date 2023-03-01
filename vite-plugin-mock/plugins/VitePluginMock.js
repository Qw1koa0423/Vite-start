const fs = require('fs')
const path = require('path')
module.exports = (options) => {
  //做的最主要的就是拦截http请求
  //当我们使用fetch或者axios请求数据的时候
  //axios  baseURL 请求地址
  //当给本地开发服务器的时候   viteserver服务器接管
  return {
    configureServer (server) {
      //server  本地开发服务器相关配置
      //server.middlewares  中间件
      //req 请求相关信息
      //res 响应相关信息
      //next 是否交给下一个中间件 调用next方法会将处理结果交给下一个中间件
      const mockStat = fs.statSync("mock")

      const isDirectory = mockStat.isDirectory()
      let mockResult = []
      if (isDirectory) {
        //process.cwd() 当前执行的根目录
        mockResult = require(path.resolve(process.cwd(), 'mock/index.js'))
        console.log('result', mockResult)
      }
      server.middlewares.use((req, res, next) => {
        console.log('req', req.url,)
        //看请求的地址在mockResult里面有没有
        const matchItem = mockResult.find(mockDescriptor => mockDescriptor.url === mockDescriptor.url)
        console.log('matchItem', matchItem)
        if (req.url === '/api/users') {
          console.log('进来了')
          const responseData = matchItem.response(req)
          //强制设置一下请求头格式为json格式
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(responseData))//设置请求头  异步的
        } else {
          next()
        }
      })
    }
  }
}