import './src/imageLoader'
import { name } from './src/assets/json/index.json'
// import jsonFile from './src/assets/json/index.json'
// console.log('jsonFile', jsonFile, JSON.stringify(jsonFile))//如果不用vite,在其他构建工具里json文件的导入会作为一个JSON字符串的形势存在


//tree shaking 摇树优化
console.log('jsonFile', name)