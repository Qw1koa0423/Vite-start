
// vite的插件必须返回给vite一个配置对象

const fs = require('fs')
const path = require('path')

function diffDirAndFile (dirFilesArr = [], basePath = '') {
  const result = {
    dirs: [],
    files: []
  }

  dirFilesArr.forEach(name => {
    const currentFileStat = fs.statSync(path.resolve(__dirname, basePath + '/' + name))
    const isDirectory = currentFileStat.isDirectory()
    if (isDirectory) {
      result.dirs.push(name)
    } else {
      result.files.push(name)
    }
  })
  return result
}

function getTotalSrcDir (keyName) {
  const result = fs.readdirSync(path.resolve(__dirname, '../src'))
  const diffResult = diffDirAndFile(result, '../src')
  const resolveAliasesObj = {} //放的就是一个一个别名配置 @assets：xxx
  diffResult.dirs.forEach(dirName => {
    const key = `${keyName}${dirName}`
    const absPath = path.resolve(__dirname, `../src/${dirName}`)
    console.log('key', key, absPath)
    resolveAliasesObj[key] = absPath
  })
  return resolveAliasesObj
}
module.exports = ({
  keyName = '@'
} = {}) => {
  return {
    config (config, env) {
      console.log('config', config, 'env', env)
      //config:目前的一个配置对象
      //env: mode:string,command:string
      //config函数可以返回一个对象，这个对象是部分的viteconfig配置
      const resolveAliasesObj = getTotalSrcDir(keyName)
      console.log('resolveAliasesObj', resolveAliasesObj)
      return {
        //这里我们要返回一个resolve出去，将src目录下所有文件夹进行别名控制
        resolve: {
          alias: resolveAliasesObj
        }
      }
    }
  }
}