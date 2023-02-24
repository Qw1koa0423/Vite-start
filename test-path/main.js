/**
 * node端读文件
 * 我们如果写的相对路径,他还尝试拼接成绝对路径
 * 
 * commonjs规范  注入几个变量  __dirname
 */
const fs = require('fs')//处理文件的模块(读文件,修改文件等一系列操作)
const path = require('path')//处理路径的模块(拼接路径,获取路径等一系列操作)

const result = fs.readFileSync(path.resolve(__dirname, './variable.css'))//我们希望基于main.js进行一个绝对路径的生成

console.log('result', result.toString(), process.cwd(), __dirname)

//node端读文件或者操作文件的时候如果发现你用的是相对路径,则会使用process.cwd()来进行对应的拼接
//process.cwd()代表当前node进程的工作目录
