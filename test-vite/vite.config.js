import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'
import { loadEnv } from 'vite'
const envResolver = {
  "build": () => {
    console.log("生产环境")
    return ({ ...viteBaseConfig, ...viteProdConfig })
  },
  "serve": () => {
    console.log("开发环境")
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  }
}

export default defineConfig(({ command, mode }) => {
  console.log('command', command)
  console.log('process', process.env)
  // process.cwd()方法：返回 Node.js 进程当前工作的目录

  console.log('process.cwd', process.cwd())

  //loadEnv手动确认env文件。
  const env = loadEnv(mode, process.cwd())
  // const env = loadEnv(mode, 'config')
  //process.cwd()方法返回的是当前执行node命令时候的文件夹地址,不是被执行文件的地址
  //所以如果是在被执行文件的目录下执行node命令，那么两者是一样的。
  //如果是在被执行文件的上一级目录下执行node命令，那么两者就不一样了。
  //如果.env是在src目录下，第二个参数就写src/。
  //envPrefix 不应被设置为空字符串 ''，这将暴露你所有的环境变量，导致敏感信息的意外泄漏。 检测到配置为 '' 时 Vite 将会抛出错误.
  console.log('env', env)
  return envResolver[command]()
})