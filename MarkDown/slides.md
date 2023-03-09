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
<div class='overflow-y-scroll max-h-[425px]'>
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

dotenv第三方库：找.env文件，自动读取并解析对应环境变量，注入到process(node端)对象
(但是vite考虑到和其他配置的一些冲突问题，不回直接注入到process对象下)。
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
//如果是客户端, vite会将对应的环境变量注入到import.meta.env里去
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
<div class='overflow-y-scroll max-h-[425px]'>
<div v-click='1'>

### vite天生支持对css的直接处理
</div>
<div v-click='2'>

```css
/* index.css */
html,
body {
  width: 100%;
  height: 100%;
  background: rebeccapurple;
}
```
```javascript
//main.js
import './index.css'
```
</div>
<div v-click=3>

### 原理
- vite在读取到main.js中引用到了index.css
- 直接使用fs模块去读取index.css中文件内容
- 直接创建一个style标签，将index.css中文件内容直接copy进style标签里
- 将style标签插入到index.html的head中
- 将该css文件中的内容直接替换为js脚本(方便热更新或者css模块化),同时设置content-type为js，从而让浏览器以js脚本的形式来执行该css后缀的文件。
</div>
<div v-click='4'>

> 场景: 协同开发同类名
</div>
<div v-click='5'>

```javascript
//componentA.js
import './componentA.css'
const div = document.createElement('div')

document.body.appendChild(div)

div.className = 'footer'
//componentB.js
import './componentB.css'
const div = document.createElement('div')

document.body.appendChild(div)

div.className = 'footer'
//main.js
import './componentA.js'
import './componentB.js'
```
```css
/* componentA.css */
.footer {
  width: 200px;
  height: 100px;
  background-color: lightblue;
}
/* componentB.css */
.footer {
  width: 100px;
  height: 200px;
  background-color: #000;
}
```
</div>

<div v-click='6'>

### cssmodule  (xxx.css=>xxx.module.css)
```javascript
//componentA.js
import componentAcss from './componentA.module.css'
console.log("componentAcss",componentAcss)
div.className = componentAcss.footer
//componentB.js
import componentBcss from './componentB.module.css'
console.log("componentBcss",componentBcss)
div.className = componentBcss.footer
```
</div>
<div v-click='7'>

### 原理
- 基于node
	- module.css(module是一种约定，表示需要开启css模块化)
	- 将所有类名进行一定规则的替换(补哈希值)
	- 同时创建一个映射对象,将类名转换为key,替换后的为value {footer: "_footer_1huk0_1"}
	- 将替换后的内容塞进style标签里放入head标签中
	- 将componentA.module.css内容全部去除，替换成js脚本
	- 将创建的映射对象在脚本中进行默认导出
</div>
<div v-click='8'>

### less
```less
// componentA.module.less
.content {
  .main {
    background: green;
  }
}
```
```javascript
import componentAless from './componentA.module.less'
console.log("componentAless", componentAless)
```
</div>
<div v-click='9'>

### vite.config.js中的css配置
</div>
<div v-click='9'>

> 在vite.config.js中通过css属性去控制整个vite对css的处理
<div v-click='10'>

- modules(对css模块化的配置)
	- localsConvention:修改生成对象的key的展示形式(驼峰|中划线)
	- scopeBehaviour:配置当前的模块化行为是模块化还是全局化
	- generateScopedName:生成类名的规则(可以配置为函数，也可以配置成字符串规则:[链接](https://github.com/webpack/loader-utils#interpolatename)
	- globalModulePaths:代表不想参与到css模块化的路径
- preprocessorOptions(用来配置css预处理器的全局参数)
- devSourcemap
	- 文件之间的索引,假设我们的代码被压缩或者编译过了，这个时候如果程序出错，他将不会产生正确的错误位置信息，如果设置了sourceMap，他就会有一个索引文件map
- postcss(保证css在执行起来是万无一失的)

```javascript
import { defineConfig } from 'vite'

const postcssPresetEnv = require('postcss-preset-env')

export default defineConfig({
  //对css行为进行配置
  css: {
    //对css模块化默认行为进行配置
    //modules配置最终会丢给postcss modules
    modules: {
      //修改生成对象的key的展示形式(驼峰|中划线)
      localsConvention: 'camelCaseOnly',
      //配置当前的模块化行为是模块化还是全局化(有hash就是开启了模块化的一个标志，因为他可以产生不同的hash值来控制我们样式类名不被覆盖)
      scopeBehaviour: 'local',
      /**
       * @see https://github.com/webpack/loader-utils#interpolatename
       */
      generateScopedName: '[name]_[local]_[hash:5]',
      generateScopedName: (name, filename, css) => {
        // 输出在node
        // name=> 代表此时css文件的类名
        // filename=> 代表此时css文件的路径
        // css=>  代表此时css文件的内容
        console.log('name', name, 'filename', filename, 'css', css)
        //配置成函数以后，返回值决定了他最终显示的类型
        return `${name}_${Math.random().toString(36).substring(3, 8)}`
      },
      globalModulePaths: ['./componentB.module.css'] //代表不想参与到css模块化的路径
    },
    preprocessorOptions: {
      //key + config  key代表你想要使用的预处理器的名字, config代表你想要配置的内容
      less: {
        //整个配置对象都会最终给到less的执行参数(全局参数)中去
        math: 'always',
        globalVars: {//全局变量
          maincolor: 'red'
        }
      },
    },
    devSourcemap: true,//是否生成sourcemap(文件索引)
    postcss: {
      plugins: [postcssPresetEnv()]
    },
  }
})
```
```javascript
/**
 * @see https://github.com/postcss/postcss
 */

const postcssPresetEnv = require('postcss-preset-env')
module.exports = {
  plugins: [postcssPresetEnv()]
}
```
</div>
<div class='hidden' >

### vite对postcss有良好的支持
#### postcss:保证css在执行起来是万无一失的
- 我们写的css代码(怎么爽怎么来) --> postcss ---> less --> 再次对未来的高级css语法进行降级 --> 前缀补全 --> 浏览器客户端 
#### babel:保证js执行起来万无一失
- 我们写的js代码(怎么爽怎么来) --> babel --> 将最新的ts语法进行转换js语法 --> 做一次语法降级  --> 浏览器客户端去执行
```javascript
class App{ }//es6 写法
function App(){ }//es3 写法
```
- less预处理器不能解决兼容性问题
 - 对未来css属性使用降级问题
 - 前缀补全: Google --webkit
### 使用postcss
- 安装依赖
	- `yarn add postcss-cli postcss -D`
	- `npx postcss index.css -o result.css`
- 书写描述文件
	- postcss.config.js
	目前来说 less和sass等一系列预处理器的postcss插件已经停止维护了 less插件 你自己去用less和sass编译完了, 然后你把编译结果给我

**所以业内就产生了一个新的说法: postcss是后处理器** less的postcss的插件就ok了 
</div>
<div v-click='10'>

### vite加载静态资源
</div>
<div v-click='11'>

> 什么是静态资源
- 前端：图片,视频资源  放在本地的
- 服务端：除了动态API之外，99%的资源都称为静态资源  
	- API——>请求 /getUserInfo  服务器需要去处理的
```html
目录结构
- src
	-assets
		-images
			-xxx.jpg
	-imageLoader.js
```

</div>
<div v-click='12'>

```javascript
//imageLoader.js
import imgUrl from '../src/assets/images/1.jpg'
// import imgUrl from '@assets/images/1.jpg'

// raw 服务端会读取图片文件的内容  =》buffer  二进制的字符串  


console.log('imgUrl', imgUrl)//拿到的是一个绝对路径
const img = document.createElement('img')
img.src = imgUrl
document.body.appendChild(img)
//main.js 
import './src/imageLoader'
import { name } from './src/assets/json/index.json'
import './src/components/baseComponents/Button/index'
import './src/svgLoader'
import jsonFile from './src/assets/json/index.json'
import './src/components/baseComponents/Button/index'
//如果不用vite,在其他构建工具里json文件的导入会作为一个JSON字符串的形式存在
console.log('jsonFile', jsonFile, JSON.stringify(jsonFile))

//tree shaking 摇树优化:打包工具会自动帮你移除掉那些没有用到的变量或者方法
console.log('jsonFile', jsonFile.name)
console.log('jsonFile', name)

```
```json
{
  "name": "test-vite",
  "version": "0.0.0"
}
```

</div>
<div v-click='13'>

```html
目录结构
- src
	-assets
		-images
			-1.jpg
	- components
		-baseComponents
			-Button
				-index.js
```
```javascript
//Button/index.js
import img1Url from '../../../assets/images/1.jpg'
// vite.base.config.js
import { defineConfig } from 'vite'
import path from 'path'
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@assets": path.resolve(__dirname, './src/assets'),
    }
    //原理：服务端读到@的时候，会去找到@对应的路径，然后把@替换成对应的路径
  }
})
```
</div>
<div class='hidden' v-click='14'>

### resolve.alias原理
> 具体看vite-resolve-alias文件

</div>
<div v-click='14'>

### vite处理svg资源
>svg: scalable vector graphics 可伸缩矢量图形
- svg不会失真
- 尺寸小
- 没法很好去表示层次丰富的图片信息
- 更多用来做图标
```javascript
import svgIcon from './assets/svgs/pot.svg'
import svgRaw from './assets/svgs/pot.svg?raw'
console.log('svgIcon', svgIcon)
console.log('svgRaw', svgRaw)

// 第一种加载svg的方式
const img = document.createElement('img')
img.src = svgIcon
document.body.appendChild(img)

// 第二种加载svg的方式
// document.body.innerHTML = svgRaw
// const svgElement = document.getElementsByTagName('svg')[0]
// svgElement.onmouseenter = function () {
// // svg的颜色是通过fill属性来控制的
//     this.style.fill = 'red'
// }
```
</div>
<div v-click='15'>

### vite在生产环境对静态资源的处理

> 打包之后的静态资源为什么要有hash
- 浏览器有一个缓存机制  静态资源名字只 要不该，那么他就会之间用缓存的
- 刷新页面: 请求的名字是不是同一个  读取缓存
- hash算法:将一串字符经过运算得到一个新的乱码字符串
- 利用好hash算法  可以让我们更换的控制浏览器缓存机制
```javascript
export default defineConfig({
build: {//构建生产包的配置
    rollupOptions: {//配置rollup的选项
      /**
       * @see https://www.rollupjs.com/guide/big-list-of-options#outputchunkfilenames
       */
      output: {//配置rollup输出的选项
        //在rollup里，hash代表将你的文件名喝文件内容进行组合计得来的结果
        assetFileNames: "[hash].[name].[ext]",
      },
    },
    assetsInlineLimit: 4096000,//默认是4096，代表的是小于4kb的文件会被转换成base64的格式
    outDir: "dist",//默认是dist  打包后的文件夹名字
    assetsDir: "static",//默认是assets  静态资源文件夹
  }
	})
```
</div>
</div>
</div>
<!-- -->

---
layout: bullets

---

<img v-motion-pop-visible src="/logo.png" style="zoom:10%;" />
<div class='absolute top-14 left-28'>

## vite的插件以及常用插件的使用
</div>
<div class='overflow-y-scroll max-h-[425px]'>
<div v-click='1'>

### 插件是什么
> vite的插件会在不同的生命周期的不同阶段中去调用不用的插件以达到不同的目的
</div>
<div v-click='2'>

### vite-aliases
> vite-alias可以帮助我们自动生成别名: 检测你当前目录下包括src在内的所有文件夹，并帮助我们去生成别名
> [链接](https://github.com/subwaytime/vite-aliases)
</div>
<div class='hidden'>

### 手写vite-alias插件
>[链接](https://cn.vitejs.dev/guide/api-plugin.html)

> 我们去手写vite-aliases其实就是抢在vite执行配置之前去改写配置文件
</div>
<div class='hidden'>

- 通过vite.config.js 返回出去的配置对象以及我们在插件的config生命周期中返回的对象都不是最终的配置对象
- vite会把这几个配置对象进行合并
```javascript

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
```
</div>
<div v-click='3'>

### vite常用插件之vite-plugin-html
> vite-plugin-html可以帮我们动态的去控制生成html的内容
[链接](https://github.com/vbenjs/vite-plugin-html)
```javascript
module.exports = (options) => {
  /**
   * @see  https://cn.vitejs.dev/guide/api-plugin.html#transformindexhtml
   */

  return {
    // 转换html的
    //将我们插件的一个执行时机提前
    transformIndexHtml: (html) => {
      enforce: 'pre',
        console.log('html', html)
      return html.replace(/<%= title %>/g, options.inject.data.title)
    }
  }
}
```
</div>
<div v-click='4'>

### vite常用插件之vite-plugin-mock
[链接](https://github.com/vbenjs/vite-plugin-mock)
- mock:模拟数据
- 前后端并行开发开发
- 1.简单方式:直接写死一两个数据  方便调试
	- 缺陷
		- 没法做海量数据测试
		- 没法获得一些标准数据
		- 没法感知http的异常
- 2.mockjs:模拟海量数据的，vite-plugin-mock的依赖项就是mockjs
```javascript
const mockJs = require('mockjs')

// const userList = [
//   {
//     name: '张三',
//     age: 18,
//     id: 1,
//     createTime: '2021-01-01 12:00:00',
//     avatar: 'https://img2.baidu.com/it/u=1609812019.jpg'
//   }
// ]

const userList = mockJs.mock({
  "data|100": [{
    name: '@cname', //中文名称
    ename: "@first", //英文名称
    "id|+1": 1,//数字从当前数开始后续依次加一
    avatar: '@image(200x200,@ename)', //生成图片
    createTime: '@datetime', //生成时间
  }]
})

module.exports = [{
  method: "post",
  url: "/api/users",
  response: ({ body }) => {
    //body 请求体
    //page  pageSize body
    return {
      code: 200,
      msg: 'success',
      data: userList
    }
  }
}]
```
<div class='hidden'>

```javascript
const fs = require('fs')
const path = require('path')
module.exports = (options) => {
  //做的最主要的就是拦截http请求
  //当我们使用fetch或者axios请求数据的时候
  //axios  baseURL 请求地址
  //当给本地开发服务器的时候   vite server服务器接管
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
```
</div>


</div>
</div>
<!--
 生命周期: 其实就和我们人一样, vite从开始执行到执行结束, 那么着整个过程就是vite的生命周期
 -->


---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite于Ts结合

</div>
<div class='overflow-y-scroll max-h-[425px]'>
<div v-click='1'>

> TS:JS的类型检查工具，检查我们代码中可能存在的隐性问题 同时给我们一些语法提示
</div>
<div v-click='2'>

```javascript
//main.js
console.log(123)
```
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script src="./src/main.js" type="module"> </script>
</body>

</html>
```
</div>
<div v-click='3'>

```typescript
//main.ts
console.log('Hello from main.js')
let str: string = 'Hello from main.ts'

interface PersonFields {
  name: string
  age: number
}
function demo(params: PersonFields) {
  console.log('name', params.name, 'age', params.age)
}

console.log(
  str,
  demo({
    name: 'zhangsan',
    age: 18,
  })
)

```
```json
//去配置一些ts的检查手段和检查规则
{
  "compilerOptions": {
    "skipLibCheck": true, //是否跳过node_modules检查库文件
    "module": "ESNext", //模块化规范
    "types": [
      "vite/client"
    ],
    "moduleResolution": "node", //模块解析策略
  }
}
```
</div>
<div v-click='4'>

> 我们怎么让TS的错误直接输出到控制台
[链接](https://github.com/fi3ework/vite-plugin-checker)
```typescript
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
  ],
})

```
</div>
</div>
<!-- -->


---
layout: false

---

<div class='hidden'>
<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite性能优化

</div>
<div class='overflow-y-scroll max-h-[425px]'>

<div v-click='1'>

>我们平时在说的性能优化是什么东西？
- 开发时态的构建速度优化:yarn dev/yarn start 敲下的瞬间到呈现结果要占用多少时长
	- webpack在这方面下的功夫是很重的：cache-loader  如果两次构建源代码没有产生变化，则直接使用缓存 不调用loader   thread-loader  开启多线程构建
	- vite 是按需加载不需要太关注这方面
- 页面性能指标:和我们怎么写代码有关
	- 首屏渲染时:fcp (first content paint)
		- 懒加载: 需要我们写代码实现
		- http优化: 协商缓存和强缓存
			- 强缓存: 服务端给响应头追加一些字段(expires)客户端会记住这些字段,在expires(截止失效时间)没有到达之前,无论你怎么刷新页面,浏览器都不会重新请求页面,而是从缓存里取
			- 协商缓存: 是否使用缓存要跟后端商量，当服务端给我们打上协商缓存的标记后，客户端在下次刷新页面需要重新请求资源时会发送一个协商请求到服务端，服务端如果说需要变化，则会响应具体的内容，如果服务端觉得没变化，则会响应304
	- 页面中最大元素的一个时长:lcp (last content paint)
	- ……
- js逻辑:
	- 副作用清除 组件的频繁挂载和卸载: 如果我们某个组件有计时器(setTimeOut),如果我们在卸载的时候不去清除这个定时器，下次再次挂载的时候计时器等于开了两个线程
```javascript
const [timer,setTimer] = useState(null);
useEffect(()=>{
	setTimer(	setTimeout(()=>{}));
	return ()=>clearTimeout(timer);
},[])
```
<div class='hidden'>

- 在写法上注意事项：requestAnimationFrame,requestIdleCallback 卡浏览器帧率
	- requestIdleCallback: 传一个函数进去
	- 浏览器的帧率: 16.6ms 去更新一次 （执行js逻辑 以及重排重绘...） 假设我的js执行逻辑超过了16.6   就会掉帧
	- concurrency  可中断渲染  react
</div>

- 防抖 节流 lodash js工具库 Array.prototype.forEach
```javascript
const arr=[];//几千条
arr.forEach //不要用arr.forEach  lodash.forEach
```
- 对作用域的控制
```javascript
const arr = [1,2,3];
for(let i = 0, len = arr.length; i < len; i ++){
	
}
```
- css
	- 关注继承属性: 能继承的不要重复写
	- 避免太过于深的嵌套

- 构建优化: vite(rollup) webpack
	- 优化体积: 压缩 treeshaking 图片资源压缩  cdn加载 分包
</div>
<div v-click='2'>

### 分包策略
##### 浏览器缓存策略

##### 静态资源-->名字有无变化
##### 业务代码会经常变化而我们的请求库不会，分包就是把不常改变的文件单独打包

</div>
<div v-click='3'>


</div>
</div>
</div>
<!-- -->



---
layout: bullets

---

<div class='hidden'>
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

</div>
<!-- -->
