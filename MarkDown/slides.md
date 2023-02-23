---
theme: apple-basic
favicon: /favicon.ico
layout: fact
title: Vite
---

<img  src="/logo.png" style="zoom:30%;" class='mx-auto' />

# Vite

下一代前端开发与构建工具

为开发提供极速响应

<!--
Vite: 思维比较前卫而且先进的构建工具,他确实解决了一些webpack解决不了的问题。
Vite是Vue团队的官方出品
目前使用vue-cli去构建vue项目的时候你要写的vue.config.js不再是webpack的配置而是vite的配置(目前只基于浏览器项目)
Vite也支持直接构建react项目, 也支持构建angular项目, svelte项目也支持构建
-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />
<br>
<div class='absolute top-14 left-28'>

## 模块
</div>
<div v-click class='overflow-y-scroll max-h-[425px]'>

- 什么是构建工具
- webpack 的缺点在哪
- es module 的规范
- vite 是什么
- vite 的基本安装和使用
- vite 编译结果的分析
- vite 的配置文件
- vite 中处理 css、静态资源
- vite 的插件以及常用插件的使用
- vite 与 Ts 的结合
- vite 生产打包
- vite 构建 React 项目
- vite 的构建原理
</div>

---
layout: bullets
clicks: 11

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />
<div class='absolute top-14 left-28'>

## 什么是构建工具？
</div>
<div class='overflow-y-scroll max-h-[425px] '>
<div v-click='1'>

### 项目可能具备哪些功能
</div>
<div v-click='2'>

-  typescript: 如果遇到ts文件我们需要使用tsc将typescript代码转换为js代码
```typescript
//index.ts
interface IPerson {
  name: string
}
const person: IPerson = {
  name: 'John',
}
//被tsc转化为=>
var person = {
    name: 'John'
};
```
</div>
<div v-click='3'>

- React/Vue: 安装react-compiler / vue-complier, 将我们写的jsx文件或者.vue文件转换为render函数
```javascript
//APP.jsx
export default function App() {
  return <div>Hello World</div>
}
//被转化为=>
ReactDOM.createRoot(document.getElementById('root') ).render( <App />)
```
</div>
<div v-click='4'>

- less/sass/postcss/component-style: 我们又需要安装less-loader, sass-loader等一系列编译工具
```less
//style.less
.wrapper {
  .content {
    display: block;
  }
}
//转化为=>
.wrapper .content{
  display: block;   
}
```
</div>
<div v-click='5'>

- 语法降级: babel ---> 将es的新语法转换旧版浏览器可以接受的语法
```html
兼容IE6/7/8,360浏览器等等。
```
</div>
<div v-click='6'>

- 体积优化: uglifyjs ---> 将我们的代码进行压缩变成体积更小性能更高的文件
```javascript
//index.js
function abcdefg(){
    return alert('hello world')
}
//转换为=>
function a(){
    return alert('hello world')
}
```
</div>
<div v-click='7' >

我们写的代码一变化就有东西帮我们自动去tsc, react-compiler, less, babel, uglifyjs全部挨个走一遍转化成浏览器认识的代码,我们只需要关心我们写的代码。
这个东西就叫做**构建工具**
</div>
<div v-click='8'>

### 一个构建工具他到底承担了哪些工作:
</div>
<div v-click='9'>

- 模块化开发支持: 支持直接从node_modules里引入代码 + 多种模块化支持
```html
<script type="module">
	//es6 module
	import _ from 'lodash'
	console.log('lodash', _)

	//commonjs
	const loadsh = require('lodash')
	console.log('loadsh', loadsh)
	</script>
		
<script src="./main.js" type="module"></script>
```
```js
//index.js
export const count = 0
//main.js
import {count} from './index.js'
console.log('count',count)
```
```js
// App.jsx
// 这一段代码最终会到浏览器里去运行
import _ from 'lodash-es'// es6 module
const lodash = require("lodash"); // commonjs 规范
```

- 处理代码兼容性: 比如babel语法降级, less,ts 语法转换(**这不是构建工具做的, 构建工具将这些语法对应的处理工具集成进来自动化处理**)
- 提高项目性能: 压缩文件, **代码分割**
- 优化开发体验: 
   - 构建工具会帮你自动监听文件的变化, 当文件变化以后自动帮你调用对应的集成工具进行重新打包, 然后再浏览器重新运行（整个过程叫做热更新, hot replacement）
   - 开发服务器: 跨域的问题, 用react-cli create-react-element vue-cli  解决跨域的问题
</div>
<div v-click='10' >

构建工具他让我们可以不用每次都关心我们的代码在浏览器如何运行, 我们只需要首次给构建工具提供一个配置文件(这个配置文件也不是必须的, 如果你不给他，他会有默认的帮你去处理), 有了这个集成的配置文件以后, 我们就可以在下次需要更新的时候调用一次对应的命令就好了, 如果我们再结合热更新, 我们就更加不需要管任何东西, 这就是构建工具去做的东西, **他让我们不用关心生产的代码也不用关心代码如何在浏览器运行, 只需要关心我们的开发怎么写的爽怎么写就好了**
</div>
<div v-click='11' >

### 主流的构建工具
- webpack
- vite
- parcel
- esbuild
- rollup
- grunt
- gulp
</div>
</div>

<!--
1.TS
2.React/vue
3.less/sass
4.babel
5.体积优化

总结一下什么是构建工具。

当前主流的构建工具webpack和vite用的比较多的，vite在打包生产的时候会用到rollup这个库
-->

---
layout: bullets
---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />
<div class='absolute  top-14  left-28'>

## vite相较于webpack的优势？
</div>
<div class='overflow-y-scroll max-h-[425px] '>
<div v-click='1'>

<img src='/01.png' />
</div>
<div v-click='2'>

> **起因**: 我们的项目越大 =》工具（webpack）所要处理的js代码就越多 【跟webpack的一个构建过程（工作流程）有关系】。
</div>
<div v-click='3'>

### webpack支持多种模块化
```js
// index.js
// webpack是允许我们这么写的
const lodash = require("lodash"); // commonjs 规范
import Vue from "vue"; // es6 module

// webpack的一个转换结果
const lodash = webpack_require("lodash");
const Vue = webpack_require("vue");
```
</div>
<div v-click='4'>

> 依靠AST抽象语法工具，分析出你写的这个js文件有哪些导入和导出操作，由于前端没办法改文件，服务端可以修改文件，构建工具运行在服务端，`yarn start`命令后会构建一个服务器，把你的文件改了，换成他自己的一套。

> 因为webpack支持多种模块化, 他一开始必须要统一模块化代码, 所以意味着他需要将所有的依赖全部读一遍。

> **结果**: 构建工具需要很长时间才能启动开发服务器 (启动开发服务=>项目跑起来）这是webpack最大的一个缺陷。
</div>
<div v-click='5'>

<img src='/02.png' />

<img src='/03.png' />
</div>
<div v-click='6'>

>webpack是把所有依赖都解析完并且打包，再运行起来，我们的项目越大，启动的时间就越长。

>vite是直接开启开发服务器，同时把entry（入口文件）去加载，按需加载模块，不管项目多大，多臃肿，他都会直接启动开发服务器，进行按需加载。
</div>
<div v-click='7'>

> 会不会替代webpack？vite是基于es modules的, 侧重点不一样,项目不一定只是跑在浏览器端的， webpack更多的关注兼容性, 而vite关注浏览器端的开发体验。
</div>
</div>

<!--
vite 背靠vue团队 

vite会不会直接把webpack干翻, 

比如说路由，home页面和一个about页面，你没用到about页面的代码，这个页面就不会被加载，只要知道他的启动要比webpack要快，是因为他采取先开启开发服务器，并且不会一次性将所以的依赖去读完，但是webpack必须要把他解析完。
-->

---
layout: bullets

---

<img v-motion-pop-visible src="/logo.png" style="zoom:10%;" />
<div class='absolute top-14 left-28'>

## 什么是vite
</div>
<div  class='overflow-y-scroll max-h-[425px] '>
<div v-click='1'>

### vite脚手架和vite
官方文档：https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project
</div>
<div v-click='2'>

比如我们敲了`yarn create vite`(vite的脚手架)
```html
1.帮我们全局安装一个东西：create-vite     //比如react脚手架 npx create react-app  =>create-react-app

2.直接运行这个create-vite bin目录下的一个执行配置
```
<div v-click='3'>

- 开箱即用(out of box): 你不需要做任何额外的配置就可以使用vite来帮你处理构建工作
- 在默认情况下, 我们的esmodule去导入资源的时候, 要么是绝对路径, 要么是相对路径，而vite会自动帮你从node_modules(最佳实践)引入。
</div>
<div v-click='4'>

```html
浏览器为什么不直接引入node_modules?
1.假如浏览器引入了node_modules，那么我们引入的模块会被发现，我们引入的模块也可能引入了其他的模块，其他的模块又引入了更多的模块。
2.浏览器通过Http加载模块，非常消耗网络资源的性能。
3.构建工具运行在服务端，不是通过网络请求去查找的，而是通过读文件去查找的。
```
</div>
</div>
</div>

<!--
create-vite和vite的关系实际上是create-vite内置了vite
就跟cra内置了webpack一样，但是你不能说使用cra创建的项目是webpack去做的事情，所以cra和webpack的关系就等同于create-vite和vite的关系。
-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />
<div class='absolute  top-14  left-28'>

## vite的基本安装和使用
</div>

###  安装
```html
yarn add vite -D
```

### 修改配置
```json
"scripts": {
    "dev": "vite"
  }
```

### 运行
```html
yarn dev
```

<!--

-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute top-14 left-28'>

## vite的编译结果分析
</div>
<div class='overflow-y-scroll max-h-[425px] '>
<div v-click='1'>

>vite处理过程中如果看到有非绝对路径或者相对路径的引用，他会尝试开启路径补全
</div>
<div v-click='2'>

```js
import _ from 'lodash'
//vite补全后=>
import _ from '/node_modules/.vite/lodash'

//找寻依赖的过程是自当前目录依次向上查找的过程, 直到搜寻到根目录或者搜寻到对应依赖为止
// 就是说当前目录下的node_modules有没有对应的依赖，没有的话就会找当前目录的父级目录一直找到根目录为止*/

import __vite__cjsImport1_lodash from "/node_modules/.vite/deps/lodash.js?v=e073fc78"

/****************************************************/

- test_vite
  - user
    - node_modules
     - lodash
//打包后路径=>
"/user/node_modules/lodash"  //  ../../user/node_modules/lodash
```
</div>
<div v-click='3'>

### 开发和生产区分
```html
开发 =>yarn dev(每次依赖预构建所重新构建的相对路径都是正确的)
生产环境：vite会全权交给一个叫做rollup的库去完成生产环境的打包，跟webpack一样兼容特别多的场景，不止支持esmodule，也支持commonjs规范。

```
</div>
<div v-click='4'>

>解决办法：依赖预构建：首先vite会找到对应的依赖, 然后调用esbuild(对js语法进行处理的一个库), 将其他规范的代码转换成esmodule规范, 然后放到当前目录下的node_modules/.vite/deps, 同时对esmodule规范的各个模块进行统一集成。

他解决了3个问题: 
1. 不同的第三方包会有不同的导出格式(这个是vite没法约束人家的事情)
2. 对路径的处理上可以直接使用.vite/deps, 方便路径重写
3. 叫做网络多包传输的性能问题(也是原生esmodule规范不支持node_modules的原因之一), 有了依赖预构建以后无论他有多少的额外export 和import, vite都会尽可能的将他们进行集成最后只生成一个或者几个模块

</div>

<div v-click='5'>

```js
// a 
export default function a() {}

//index.js
export { default as a  } from "./a.js"
//相当于=>
import a form './a.js'
export const a = a

//vite重写以后=>
function a() {}
```
</div>
<div v-click='6'>

```js
import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps: {
    exclude: ['lodash-es'] //当遇到lodash-es时，不会进行依赖预构建
  }
})
```
</div>
</div>

<!--

-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite的配置文件
</div>
<div class='overflow-y-scroll max-h-[425px] '>
<div v-click='1' >

### 语法提示
```js
//vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({})
```
</div>

<div v-click='2'>

### 环境处理
```html
<!-- 对比webpack -->
webpack.dev.config =>vite.dev.config
webpack.prod.config=>vite.prod.config
webpack.base.config=>vite.base.config
```
```js
import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'
export default defineConfig(({ command }) => {
//command:'build'|'serve'
  if (command === 'build') {
    //代表生产环境的配置
    console.log('生产环境')
    return ({ ...viteBaseConfig, ...viteProdConfig })
  }
  else {
    //代表开发环境的配置
    console.log('开发环境')
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  }
})
```

### 策略模式写法
```js
import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'

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

export default defineConfig(({ command }) => {
  console.log('command', command)
  return envResolver[command]()
})
```

</div>
<div v-click='3'>

### 环境变量配置
</div>
<div v-click='4'>

> 环境变量: 会根据当前的代码环境产生值的变化的变量就叫做环境变量
</div>
<div v-click='5'>

```html
公司环境:1.本地2.开发3.测试4.预发5.生产

例子：接口地址
API_URL: 各个环境不一致
```
</div>
<div v-click='6'>

```js
import { request } from 'umi';
//开发：http://alpha.api/
//测试：http://beta.api/
//预发：http://rc.api/
//线上：http://api/
function login(body) {
  return request(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
```
</div>
<div v-click='7'>

```html
<!-- .env -->
API_URL=http://api/
<!-- .env.development -->
API_URL=http://alpha.api/
<!-- .env.production -->
API_URL=http://rc.api/

dotenv第三方库：找.env文件，自动读取并解析对应环境变量，注入到process(node端)对象(但是vite考虑到和其他配置的一些冲突问题，不回直接注入到process对象下)。
涉及vite.config.js中一些变量：
- root
- envDir:用来配置当前环境变量的文件地址。
```
</div>
<div v-click='8'>

>为什么node端可以认识vite.config.js?
vite他在读取这个vite.config.js的时候会率先node去解析文件语法, 如果发现你是esmodule规范会直接将你的esmodule规范进行替换变成commonjs规范。
</div>
<div v-click='9'>

> vite提供了一个loadEnv补偿措施
</div>
<div v-click='10'>

```js
export default defineConfig(({ command, mode }) => {
  console.log('command', command)
  console.log('process', process.env)
	// process.cwd()方法：返回 Node.js 进程当前工作的目录
	
  console.log('process.cwd', process.cwd())
	
	//loadEnv手动确认env文件。
  const env = loadEnv(mode, process.cwd(), '')
	//process.cwd()方法返回的是当前执行node命令时候的文件夹地址,不是被执行文件的地址
  //所以如果是在被执行文件的目录下执行node命令，那么两者是一样的。
  //如果是在被执行文件的上一级目录下执行node命令，那么两者就不一样了。
  //如果.env是在src目录下，第二个参数就写src/。第三个参数：env文件的名称，默认为.env，可以不写
  console.log('env', env)
  return envResolver[command]()
})
```
```html
.env: 所有环境都需要用到的环境变量
.env.development: 开发环境需要用到的环境变量(默认情况下vite将我们的开发环境取名为development)
.env.production: 生产环境需要用到的环境变量(默认情况下vite将我们的生产环境取名为production)

yarn dev --mode development 会将mode设置为development传递进来
```

当我们调用loadenv的时候, 他会做如下几件事:
1. 直接找到.env文件 并解析其中的环境变量并放进一个对象里
2. 会将传进来的mode这个变量的值进行拼接: `.env.【mode】`, 并根据我们提供的目录去取对应的配置文件并进行解析, 并放进一个对象
3. 我们可以理解为

```js
    const baseEnvConfig = 读取.env的配置
    const modeEnvConfig = 读取env相关配置
    const lastEnvConfig = { ...baseEnvConfig, ...modeEnvConfig }
```
如果是客户端, vite会将对应的环境变量注入到import.meta.env里去
```js
console.log('import.meta.env',import.meta.env)
//vite做了一个拦截, 他为了防止我们将隐私性的变量直接送进import.meta.env中, 所以他做了一层拦截
//如果你的环境变量不是以VITE_开头的, 他就不会帮你注入到客户端中去, 如果我们想要更改这个前缀, 可以去使用envPrefix配置
```
</div>
</div>

<!--
先读了.env文件，然后返回的配置,但是配置文件里又可能返回了envDir。那么我们设置endDir没有意义。
-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />
<div class='absolute  top-14  left-28'>

## vite中处理css，静态资源
</div>

<!-- -->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />
<div class='absolute  top-14  left-28'>

## vite的插件以及常用插件的使用
</div>
<div v-click='1'>

### vite天生支持对css的直接处理
</div>


<!-- -->


---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite于Ts结合

</div>

<!-- -->


---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite生产打包

</div>

<!-- -->


---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite构建React项目

</div>

<!-- -->


---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />
<div class='absolute  top-14  left-28'>

## vite构建原理

</div>
<div class='overflow-y-scroll max-h-[425px] '>
<div v-click='1'>

### vite是怎么让浏览器识别.vue文件的
</div>
<div v-click='2'>

> yarn create vite my-vue-app --template vue 

> `yarn create` 实际上等于在安装create-vite脚手架 然后使用脚手架的指令构建项目
</div>
<div v-click='3'>

### 实现一套简单的vite开发服务器
</div>
<div v-click='4'>

```html
koa: node端的一个框架

执行 yarn add koa

```
</div>
<div v-click='5'>

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vite dev server</title>
</head>

<body>
  hello vite dev server
  <script type="module" src="./main.js"></script>
</body>

</html>
```
```javascript
//index.js
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
```
```json
 "scripts": {
    "dev": "node index.js"
  },
```
```javascript
//main.js
import './App.vue'
console.log('main.js')
//App.vue
console.log('App.vue')
```
</div>


</div>

<!-- -->
