module.exports = function (aliasConf, JSContent) {
  const entires = Object.entries(aliasConf)
  let lastContent = JSContent
  entires.forEach(entire => {
    const [alia, path] = entire
    //会对path做相对路径的处理
    const srcIndex = path.indexOf('src')
    //alias别名是做的一个字符串的替换
    const realPath = './' + path.slice(srcIndex, path.length)
    console.log('realPath', srcIndex, realPath)
    lastContent = JSContent.replace(alia, realPath)
  })
  console.log('lastContent', lastContent)
  return lastContent
}