# 目录

[TOC]

## 什么是构建工具？

### 项目可能具备哪些功能

- typescript: 如果遇到 ts 文件我们需要使用 tsc 将 typescript 代码转换为 js 代码

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
  name: 'John',
}
```

- React/Vue: 安装 react-compiler / vue-complier, 将我们写的 jsx 文件或者.vue 文件转换为 render 函数

```javascript
//APP.jsx
export default function App() {
  return <div>Hello World</div>
}
//被转化为=>
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

- less/sass/postcss/component-style: 我们又需要安装 less-loader, sass-loader 等一系列编译工具

```less
//style.less
.wrapper {
  .content {
    display: block;
  }
}
//转化为=>
.wrapper .content {
  display: block;
}
```

- 语法降级: babel ---> 将 es 的新语法转换旧版浏览器可以接受的语法

```html
兼容IE6/7/8,360浏览器等等。
```

- 体积优化: uglifyjs ---> 将我们的代码进行压缩变成体积更小性能更高的文件

```javascript
//index.js
function abcdefg() {
  return alert('hello world')
}
//转换为=>
function a() {
  return alert('hello world')
}
```

我们写的代码一变化就有东西帮我们自动去 tsc, react-compiler, less, babel, uglifyjs 全部挨个走一遍转化成浏览器认识的代码,我们只需要关心我们写的代码。
这个东西就叫做**构建工具**

### 一个构建工具他到底承担了哪些工作:

- 模块化开发支持: 支持直接从 node_modules 里引入代码 + 多种模块化支持

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

```javascript
//index.js
export const count = 0
//main.js
import { count } from './index.js'
console.log('count', count)
```

```javascript
// App.jsx
// 这一段代码最终会到浏览器里去运行
import _ from 'lodash-es' // es6 module
const lodash = require('lodash') // commonjs 规范
```

- 处理代码兼容性: 比如 babel 语法降级, less,ts 语法转换(**这不是构建工具做的, 构建工具将这些语法对应的处理工具集成进来自动化处理**)
- 提高项目性能: 压缩文件, **代码分割**
- 优化开发体验:
  - 构建工具会帮你自动监听文件的变化, 当文件变化以后自动帮你调用对应的集成工具进行重新打包, 然后再浏览器重新运行（整个过程叫做热更新, hot replacement）
  - 开发服务器: 跨域的问题, 用 react-cli create-react-element vue-cli 解决跨域的问题

构建工具他让我们可以不用每次都关心我们的代码在浏览器如何运行, 我们只需要首次给构建工具提供一个配置文件(这个配置文件也不是必须的, 如果你不给他，他会有默认的帮你去处理), 有了这个集成的配置文件以后, 我们就可以在下次需要更新的时候调用一次对应的命令就好了, 如果我们再结合热更新, 我们就更加不需要管任何东西, 这就是构建工具去做的东西, **他让我们不用关心生产的代码也不用关心代码如何在浏览器运行, 只需要关心我们的开发怎么写的爽怎么写就好了**

### 主流的构建工具

- webpack
- vite
- parcel
- esbuild
- rollup
- grunt
- gulp

## vite 相较于 webpack 的优势？

> **起因**: 我们的项目越大 =》工具（webpack）所要处理的 js 代码就越多 【跟 webpack 的一个构建过程（工作流程）有关系】。

### webpack 支持多种模块化

```javascript
// index.js
// webpack是允许我们这么写的
const lodash = require('lodash') // commonjs 规范
import Vue from 'vue' // es6 module

// webpack的一个转换结果
const lodash = webpack_require('lodash')
const Vue = webpack_require('vue')
```

> 依靠 AST 抽象语法工具，分析出你写的这个 js 文件有哪些导入和导出操作，由于前端没办法改文件，服务端可以修改文件，构建工具运行在服务端，`yarn start`命令后会构建一个服务器，把你的文件改了，换成他自己的一套。

> 因为 webpack 支持多种模块化, 他一开始必须要统一模块化代码, 所以意味着他需要将所有的依赖全部读一遍。

> **结果**: 构建工具需要很长时间才能启动开发服务器 (启动开发服务=>项目跑起来）这是 webpack 最大的一个缺陷。

> webpack 是把所有依赖都解析完并且打包，再运行起来，我们的项目越大，启动的时间就越长。

> vite 是直接开启开发服务器，同时把 entry（入口文件）去加载，按需加载模块，不管项目多大，多臃肿，他都会直接启动开发服务器，进行按需加载。

> 会不会替代 webpack？vite 是基于 es modules 的, 侧重点不一样,项目不一定只是跑在浏览器端的， webpack 更多的关注兼容性, 而 vite 关注浏览器端的开发体验。

## 什么是 vite

### vite 脚手架和 vite

官方文档：https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

比如我们敲了`yarn create vite`(vite 的脚手架)

```html
1.帮我们全局安装一个东西：create-vite //比如react脚手架 npx create react-app
=>create-react-app 2.直接运行这个create-vite bin目录下的一个执行配置
```

- 开箱即用(out of box): 你不需要做任何额外的配置就可以使用 vite 来帮你处理构建工作
- 在默认情况下, 我们的 esmodule 去导入资源的时候, 要么是绝对路径, 要么是相对路径，而 vite 会自动帮你从 node_modules(最佳实践)引入。

```html
浏览器为什么不直接引入node_modules?
1.假如浏览器引入了node_modules，那么我们引入的模块会被发现，我们引入的模块也可能引入了其他的模块，其他的模块又引入了更多的模块。
2.浏览器通过Http加载模块，非常消耗网络资源的性能。
3.构建工具运行在服务端，不是通过网络请求去查找的，而是通过读文件去查找的。
```

## vite 的基本安装和使用

### 安装

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

## vite 的编译结果分析

> vite 处理过程中如果看到有非绝对路径或者相对路径的引用，他会尝试开启路径补全

```javascript
import _ from 'lodash'
//vite补全后=>
import _ from '/node_modules/.vite/lodash'

//找寻依赖的过程是自当前目录依次向上查找的过程, 直到搜寻到根目录或者搜寻到对应依赖为止
// 就是说当前目录下的node_modules有没有对应的依赖，没有的话就会找当前目录的父级目录一直找到根目录为止*/

import __vite__cjsImport1_lodash from '/node_modules/.vite/deps/lodash.js?v=e073fc78'

/****************************************************/
;-test_vite - user - node_modules - lodash
//打包后路径=>
;('/user/node_modules/lodash') //  ../../user/node_modules/lodash
```

### 开发和生产区分

```html
开发 =>yarn dev(每次依赖预构建所重新构建的相对路径都是正确的)
生产环境：vite会全权交给一个叫做rollup的库去完成生产环境的打包，跟webpack一样兼容特别多的场景，不止支持esmodule，也支持commonjs规范。
```

> 解决办法：依赖预构建：首先 vite 会找到对应的依赖, 然后调用 esbuild(对 js 语法进行处理的一个库), 将其他规范的代码转换成 esmodule 规范, 然后放到当前目录下的 node_modules/.vite/deps, 同时对 esmodule 规范的各个模块进行统一集成。

他解决了 3 个问题:

1. 不同的第三方包会有不同的导出格式(这个是 vite 没法约束人家的事情)
2. 对路径的处理上可以直接使用.vite/deps, 方便路径重写
3. 叫做网络多包传输的性能问题(也是原生 esmodule 规范不支持 node_modules 的原因之一), 有了依赖预构建以后无论他有多少的额外 export 和 import, vite 都会尽可能的将他们进行集成最后只生成一个或者几个模块

```javascript
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

```javascript
import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps: {
    exclude: ['lodash-es'], //当遇到lodash-es时，不会进行依赖预构建
  },
})
```

## vite 的配置文件

### 语法提示

```javascript
//vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({})
```

### 环境处理

```html
<!-- 对比webpack -->
webpack.dev.config =>vite.dev.config webpack.prod.config=>vite.prod.config
webpack.base.config=>vite.base.config
```

```javascript
import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'
export default defineConfig(({ command }) => {
  //command:'build'|'serve'
  if (command === 'build') {
    //代表生产环境的配置
    console.log('生产环境')
    return { ...viteBaseConfig, ...viteProdConfig }
  } else {
    //代表开发环境的配置
    console.log('开发环境')
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  }
})
```

### 策略模式写法

```javascript
import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'

const envResolver = {
  build: () => {
    console.log('生产环境')
    return { ...viteBaseConfig, ...viteProdConfig }
  },
  serve: () => {
    console.log('开发环境')
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  },
}

export default defineConfig(({ command }) => {
  console.log('command', command)
  return envResolver[command]()
})
```

### 环境变量配置

> 环境变量: 会根据当前的代码环境产生值的变化的变量就叫做环境变量

```html
公司环境:1.本地2.开发3.测试4.预发5.生产 例子：接口地址 API_URL: 各个环境不一致
```

```javascript
import { request } from 'umi'
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
  })
}
```

```html
<!-- .env -->
API_URL=http://api/
<!-- .env.development -->
API_URL=http://alpha.api/
<!-- .env.production -->
API_URL=http://rc.api/
dotenv第三方库：找.env文件，自动读取并解析对应环境变量，注入到process(node端)对象
(但是vite考虑到和其他配置的一些冲突问题，不回直接注入到process对象下)。
涉及vite.config.js中一些变量： - root - envDir:用来配置当前环境变量的文件地址。
```

> 为什么 node 端可以认识 vite.config.js?
> vite 他在读取这个 vite.config.js 的时候会率先 node 去解析文件语法, 如果发现你是 esmodule 规范会直接将你的 esmodule 规范进行替换变成 commonjs 规范。

> vite 提供了一个 loadEnv 补偿措施

```javascript
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
.env: 所有环境都需要用到的环境变量 .env.development:
开发环境需要用到的环境变量(默认情况下vite将我们的开发环境取名为development)
.env.production:
生产环境需要用到的环境变量(默认情况下vite将我们的生产环境取名为production) yarn
dev --mode development 会将mode设置为development传递进来
```

当我们调用 loadenv 的时候, 他会做如下几件事:

1. 直接找到.env 文件 并解析其中的环境变量并放进一个对象里
2. 会将传进来的 mode 这个变量的值进行拼接: `.env.【mode】`, 并根据我们提供的目录去取对应的配置文件并进行解析, 并放进一个对象
3. 我们可以理解为

```javascript
const baseEnvConfig = 读取.env的配置
const modeEnvConfig = 读取env相关配置
const lastEnvConfig = { ...baseEnvConfig, ...modeEnvConfig }
//如果是客户端, vite会将对应的环境变量注入到import.meta.env里去
console.log('import.meta.env', import.meta.env)
//vite做了一个拦截, 他为了防止我们将隐私性的变量直接送进import.meta.env中, 所以他做了一层拦截
//如果你的环境变量不是以VITE_开头的, 他就不会帮你注入到客户端中去, 如果我们想要更改这个前缀, 可以去使用envPrefix配置
```

## vite 中处理 css，静态资源

### vite 天生支持对 css 的直接处理

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

### 原理

- vite 在读取到 main.js 中引用到了 index.css
- 直接使用 fs 模块去读取 index.css 中文件内容
- 直接创建一个 style 标签，将 index.css 中文件内容直接 copy 进 style 标签里
- 将 style 标签插入到 index.html 的 head 中
- 将该 css 文件中的内容直接替换为 js 脚本(方便热更新或者 css 模块化),同时设置 content-type 为 js，从而让浏览器以 js 脚本的形式来执行该 css 后缀的文件。

> 场景: 协同开发同类名

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

### cssmodule

- componentA.css=>componentA.module.css

```javascript
//componentA
import componentAcss from './componentA.module.css'
console.log('componentAcss', componentAcss)
div.className = componentAcss.footer
//componentB
import componentBcss from './componentB.module.css'
console.log('componentBcss', componentBcss)
div.className = componentBcss.footer
```

> 原理

- 基于 node
- module.css(module 是一种约定，表示需要开启 css 模块化)
- 将所有类名进行一定规则的替换(补哈希值)
- 同时创建一个映射对象,将类名转换为 key,替换后的为 value {footer: "\_footer_1huk0_1"}
- 将替换后的内容塞进 style 标签里放入 head 标签中
- 将 componentA.module.css 内容全部去除，替换成 js 脚本
- 将创建的映射对象在脚本中进行默认导出

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
console.log('componentAless', componentAless)
```

### vite.config.js 中的 css 配置

> 在 vite.config.js 中通过 css 属性去控制整个 vite 对 css 的处理

- modules(对 css 模块化的配置)
  - localsConvention:修改生成对象的 key 的展示形式(驼峰|中划线)
  - scopeBehaviour:配置当前的模块化行为是模块化还是全局化
  - generateScopedName:生成类名的规则(可以配置为函数，也可以配置成字符串规则:[](https://github.com/webpack/loader-utils#interpolatename))
  - hashPrefix:生成更独特的 hash(测试后没啥用好像)
  - globalModulePaths://代表不想参与到 css 模块化的路径
- preprocessorOptions(用来配置 css 预处理器的全局参数)
- devSourcemap
  - 文件之间的索引,假设我们的代码被压缩或者编译过了，这个时候如果程序出错，他将不会产生正确的错误位置信息，如果设置了 sourceMap，他就会有一个索引文件 map
- postcss(保证 css 在执行起来是万无一失的)

```javascript
import { defineConfig } from 'vite'

// const postcssPresetEnv = require('postcss-preset-env')

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
      // /**
      //  * @see https://github.com/webpack/loader-utils#interpolatename
      //  */
      // // generateScopedName: '[name]_[local]_[hash:5]',
      // generateScopedName: (name, filename, css) => {
      //   // 输出在node
      //   // name=> 代表此时css文件的类名
      //   // filename=> 代表此时css文件的路径
      //   // css=>  代表此时css文件的内容
      //   console.log('name', name, 'filename', filename, 'css', css)
      //   //配置成函数以后，返回值决定了他最终显示的类型
      //   return `${name}_${Math.random().toString(36).substring(3, 8)}`
      // },
      // 生成hash会根据你的类名 + 一些其他的字符串(文件名 + 他内部随机生成一个字符串)去进行生成
      //如果你想要你生成hash更加的独特一点, 你可以配置hashPrefix, 你配置的这个字符串会参与到最终的hash生成,
      //hash: 只要你的字符串有一个字不一样, 那么生成的hash就完全不一样, 但是只要你的字符串完全一样, 生成的hash就会一样
      hashPrefix: 'hello',
      globalModulePaths: ['./componentB.module.css'], //代表不想参与到css模块化的路径
    },
    preprocessorOptions: {
      //key + config  key代表你想要使用的预处理器的名字, config代表你想要配置的内容
      less: {
        //整个配置对象都会最终给到less的执行参数(全局参数)中去
        math: 'always',
        globalVars: {
          //全局变量
          maincolor: 'red',
        },
      },
    },
    devSourcemap: true, //是否生成sourcemap(文件索引)
    // postcss: {
    //   plugins: [postcssPresetEnv()]
    // },
  },
})
```

```javascript
/**
 * @see https://github.com/postcss/postcss
 */

const postcssPresetEnv = require('postcss-preset-env')
module.exports = {
  plugins: [postcssPresetEnv()],
}
```

### vite 对 postcss 有良好的支持

#### postcss:保证 css 在执行起来是万无一失的

- 我们写的 css 代码(怎么爽怎么来) --> postcss ---> less --> 再次对未来的高级 css 语法进行降级 --> 前缀补全 --> 浏览器客户端

#### babel:保证 js 执行起来万无一失

- 我们写的 js 代码(怎么爽怎么来) --> babel --> 将最新的 ts 语法进行转换 js 语法 --> 做一次语法降级 --> 浏览器客户端去执行

```javascript
class App {} //es6 写法
function App() {} //es3 写法
```

- less 预处理器不能解决兼容性问题
- 对未来 css 属性使用降级问题
- 前缀补全: Google --webkit

### 使用 postcss

- 安装依赖
  - `yarn add postcss-cli postcss -D`
  - `npx postcss index.css -o result.css`
- 书写描述文件
  - postcss.config.js
    目前来说 less 和 sass 等一系列预处理器的 postcss 插件已经停止维护了 less 插件 你自己去用 less 和 sass 编译完了, 然后你把编译结果给我

**所以业内就产生了一个新的说法: postcss 是后处理器** less 的 postcss 的插件就 ok 了

### vite 加载静态资源

> 什么是静态资源

- 前端：图片,视频资源 放在本地的
- 服务端：除了动态 API 之外，99%的资源都称为静态资源
  - API=>请求 /getUserInfo 服务器需要去处理的

```html
目录结构 - src -assets -images -xxx.jpg -imageLoader.js
```

```javascript
//imageLoader.js
import imgUrl from '../src/assets/images/1.jpg'
// import imgUrl from '../src/assets/images/1.jpg?url'
// import imgUrl from '../src/assets/images/1.jpg?raw'
console.log('imgUrl', imgUrl) //拿到的是一个绝对路径
// raw 服务端会读取图片文件的内容  =》buffer  二进制的字符串
//main.js
import './src/imageLoader'
```

```json
{
  "name": "test-vite",
  "version": "0.0.0"
}
```

```javascript
//main.js
import jsonFile from './src/assets/json/index.json'
console.log('jsonFile', jsonFile, JSON.stringify(jsonFile))
//如果不用vite,在其他构建工具里json文件的导入会作为一个JSON字符串的形式存在
import { name } from './src/assets/json/index.json'
console.log('jsonFile', name)
//tree shaking 摇树优化:打包工具会自动帮你移除掉那些没有用到的变量或者方法
```

```html
目录结构 - src - components -baseComponents -Button -index.js
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
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
    //原理：服务端读到@的时候，会去找到@对应的路径，然后把@替换成对应的路径
  },
})
```

### resolve.alias 原理

> 具体看 vite-resolve-alias 文件

### vite 处理 svg 资源

> svg: scalable vector graphics 可伸缩矢量图形

- svg 不会失真
- 尺寸小
- 没法很好去表示层次丰富的图片信息
- 更多用来做图标

```javascript
import svgIcon from './assets/svgs/pot.svg'
import svgRaw from './assets/svgs/pot.svg?raw'
console.log('svgIcon', svgRaw)
// 第一种加载svg的方式
const img = document.createElement('img')
img.src = svgIcon
document.body.appendChild(img)

// 第二种加载svg的方式
// document.body.innerHTML = svgRaw
// const svgElement = document.getElementsByTagName('svg')[0]
// svgElement.onmouseenter = function () {
//   // svg的颜色是通过fill属性来控制的
//   this.style.fill = 'red'
// }
```

### vite 在生产环境对静态资源的处理

> 当我们将工程进行打包之后，会发现找不到原来的资源

- wbepack:baseUrl:'/'

> 打包之后的静态资源为什么要有 hash

- 浏览器有一个缓存机制 静态资源名字只 要不该，那么他就会之间用缓存的
- 刷新页面: 请求的名字是不是同一个 读取缓存
- hash 算法:将一串字符经过运算得到一个新的乱码字符串
- 利用好 hash 算法 可以让我们更换的控制浏览器缓存机制

```javascript
export default defineConfig({
  build: {
    //构建生产包的配置
    rollupOptions: {
      //配置rollup的选项
      /**
       * @see https://www.rollupjs.com/guide/big-list-of-options#outputchunkfilenames
       */
      output: {
        //配置rollup输出的选项
        //在rollup里，hash代表将你的文件名喝文件内容进行组合计得来的结果
        assetFileNames: '[hash].[name].[ext]',
      },
    },
    assetsInlineLimit: 4096000, //默认是4096，代表的是小于4kb的文件会被转换成base64的格式
    outDir: 'dist', //默认是dist  打包后的文件夹名字
    assetsDir: 'static', //默认是assets  静态资源文件夹
  },
})
```

## vite 的插件以及常用插件的使用

### 插件是什么

> vite 的插件会在不同的生命周期的不同阶段中去调用不用的插件以达到不同的目的

### vite-aliases

> vite-alias 可以帮助我们自动生成别名: 检测你当前目录下包括 src 在内的所有文件夹，并帮助我们去生成别名
> [](https://github.com/subwaytime/vite-aliases)

### 手写 vite-alias 插件

> [](https://cn.vitejs.dev/guide/api-plugin.html)

> 我们去手写 vite-aliases 其实就是抢在 vite 执行配置之前去改写配置文件

- 通过 vite.config.js 返回出去的配置对象以及我们在插件的 config 生命周期中返回的对象都不是最终的配置对象
- vite 会把这几个配置对象进行合并

```javascript
// vite的插件必须返回给vite一个配置对象

const fs = require('fs')
const path = require('path')

function diffDirAndFile(dirFilesArr = [], basePath = '') {
  const result = {
    dirs: [],
    files: [],
  }

  dirFilesArr.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, basePath + '/' + name)
    )
    const isDirectory = currentFileStat.isDirectory()
    if (isDirectory) {
      result.dirs.push(name)
    } else {
      result.files.push(name)
    }
  })
  return result
}

function getTotalSrcDir(keyName) {
  const result = fs.readdirSync(path.resolve(__dirname, '../src'))
  const diffResult = diffDirAndFile(result, '../src')
  const resolveAliasesObj = {} //放的就是一个一个别名配置 @assets：xxx
  diffResult.dirs.forEach((dirName) => {
    const key = `${keyName}${dirName}`
    const absPath = path.resolve(__dirname, `../src/${dirName}`)
    console.log('key', key, absPath)
    resolveAliasesObj[key] = absPath
  })
  return resolveAliasesObj
}
module.exports = ({ keyName = '@' } = {}) => {
  return {
    config(config, env) {
      console.log('config', config, 'env', env)
      //config:目前的一个配置对象
      //env: mode:string,command:string
      //config函数可以返回一个对象，这个对象是部分的viteconfig配置
      const resolveAliasesObj = getTotalSrcDir(keyName)
      console.log('resolveAliasesObj', resolveAliasesObj)
      return {
        //这里我们要返回一个resolve出去，将src目录下所有文件夹进行别名控制
        resolve: {
          alias: resolveAliasesObj,
        },
      }
    },
  }
}
```

### vite 常用插件之 vite-plugin-html

> vite-plugin-html 可以帮我们动态的去控制生成 html 的内容
> [链接](https://github.com/vbenjs/vite-plugin-html)
> webpack4 --> webpack-html-plugin / clean-webpack-plugin (clean:true)

```javascript
module.exports = (options) => {
  /**
   * @see  https://cn.vitejs.dev/guide/api-plugin.html#transformindexhtml
   */

  return {
    // 转换html的
    //将我们插件的一个执行时机提前
    transformIndexHtml: (html, ctx) => {
      enforce: 'pre',
        // ctx 表示当前整个请求的一个执行上下文
        console.log('html', html)
      return html.replace(/<%= title %>/g, options.inject.data.title)
    },
  }
}
```

### vite 常用插件之 vite-plugin-mock

[链接](https://github.com/vbenjs/vite-plugin-mock)

- mock:模拟数据
- 前后端并行开发开发
- 1.简单方式:直接写死一两个数据 方便调试
  - 缺陷
    - 没法做海量数据测试
    - 没法获得一些标准数据
    - 没法感知 http 的异常
- 2.mockjs:模拟海量数据的，vite-plugin-mock 的依赖项就是 mockjs

```javascript
const fs = require('fs')
const path = require('path')
module.exports = (options) => {
  //做的最主要的就是拦截http请求
  //当我们使用fetch或者axios请求数据的时候
  //axios  baseURL 请求地址
  //当给本地开发服务器的时候   viteserver服务器接管
  return {
    configureServer(server) {
      //server  本地开发服务器相关配置
      //server.middlewares  中间件
      //req 请求相关信息
      //res 响应相关信息
      //next 是否交给下一个中间件 调用next方法会将处理结果交给下一个中间件
      const mockStat = fs.statSync('mock')

      const isDirectory = mockStat.isDirectory()
      let mockResult = []
      if (isDirectory) {
        //process.cwd() 当前执行的根目录
        mockResult = require(path.resolve(process.cwd(), 'mock/index.js'))
        console.log('result', mockResult)
      }
      server.middlewares.use((req, res, next) => {
        console.log('req', req.url)
        //看请求的地址在mockResult里面有没有
        const matchItem = mockResult.find(
          (mockDescriptor) => mockDescriptor.url === mockDescriptor.url
        )
        console.log('matchItem', matchItem)
        if (req.url === '/api/users') {
          console.log('进来了')
          const responseData = matchItem.response(req)
          //强制设置一下请求头格式为json格式
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(responseData)) //设置请求头  异步的
        } else {
          next()
        }
      })
    },
  }
}
```

## vite 于 Ts 结合

> TS:JS 的类型检查工具，检查我们代码中可能存在的隐性问题 同时给我们一些语法提示

```javascript
//main.js
console.log(123)
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script src="./src/main.js" type="module"></script>
  </body>
</html>
```

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

> 我们怎么让 TS 的错误直接输出到控制台
> [链接](https://github.com/fi3ework/vite-plugin-checker)

## vite 性能优化

> 我们平时在说的性能优化是什么东西？

- 开发时态的构建速度优化:yarn dev/yarn start 敲下的瞬间到呈现结果要占用多少时长
  - webpack 在这方面下的功夫是很重的：cache-loader 如果两次构建源代码没有产生变化，则直接使用缓存 不调用 loader thread-loader 开启多线程构建
  - vite 是按需加载不需要太关注这方面
- 页面性能指标:和我们怎么写代码有关
  - 首屏渲染时:fcp (first content paint)
    - 懒加载: 需要我们写代码实现
    - http 优化: 协商缓存和强缓存
      - 强缓存: 服务端给响应头追加一些字段(expires)客户端会记住这些字段,在 expires(截止失效时间)没有到达之前,无论你怎么刷新页面,浏览器都不会重新请求页面,而是从缓存里取
      - 协商缓存: 是否使用缓存要跟后端商量，当服务端给我们打上协商缓存的标记后，客户端在下次刷新页面需要重新请求资源时会发送一个协商请求到服务端，服务端如果说需要变化，则会响应具体的内容，如果服务端觉得没变化，则会响应 304
  - 页面中最大元素的一个时长:lcp (last content paint)
  - ……
- js 逻辑:
  - 副作用清除 组件的频繁挂载和卸载: 如果我们某个组件有计时器(setTimeOut),如果我们在卸载的时候不去清除这个定时器，下次再次挂载的时候计时器等于开了两个线程

```javascript
const [timer, setTimer] = useState(null)
useEffect(() => {
  setTimer(setTimeout(() => {}))
  return () => clearTimeout(timer)
}, [])
```

- 在写法上注意事项：requestAnimationFrame,requestIdleCallback 卡浏览器帧率

  - requestIdleCallback: 传一个函数进去
  - 浏览器的帧率: 16.6ms 去更新一次 （执行 js 逻辑 以及重排重绘...） 假设我的 js 执行逻辑超过了 16.6 就会掉帧
  - concurrency 可中断渲染 react

- 防抖 节流 lodash js 工具库 Array.prototype.forEach

```javascript
const arr = [] //几千条
arr.forEach //不要用arr.forEach  lodash.forEach
```

- 对作用域的控制

```javascript
const arr = [1, 2, 3]
for (let i = 0, len = arr.length; i < len; i++) {}
```

- css

  - 关注继承属性: 能继承的不要重复写
  - 避免太过于深的嵌套

- 构建优化: vite(rollup) webpack
  - 优化体积: 压缩 treeshaking 图片资源压缩 cdn 加载 分包

### 分包策略

##### 浏览器缓存策略

##### 静态资源-->名字有无变化

##### 业务代码会经常变化而我们的请求库不会，分包就是把不常改变的文件单独打包

## vite 构建原理

### vite 是怎么让浏览器识别.vue 文件的

> yarn create vite my-vue-app --template vue

> `yarn create` 实际上等于在安装 create-vite 脚手架 然后使用脚手架的指令构建项目

### 实现一套简单的 vite 开发服务器

```html
koa: node端的一个框架 执行 yarn add koa
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
const Koa = require('koa') //不能使用esmodule  必须使用commonjs  koa不是原生的，需要安装，会去node_modules中找
const fs = require('fs') //node环境注入的能力，node原生有fs模块，直接注入到js中
const path = require('path')

//不同的宿主环境会赋予js不同的全局变量
//浏览器环境注入的全局  window   ex:document.getElementById(id名)

const app = new Koa() //const vue=new Vue()

//node最频繁的操作是处理请求和操作文件

//当请求来临以后回直接注入到use注册的函数中
app.use(async (ctx) => {
  //context 上下文 request -->请求信息 response -->响应信息 get请求  根地址 /
  console.log('ctx', ctx.request, ctx.response)
  //开发的时候用中间件，不用这种形式写
  if (ctx.request.url === '/') {
    //意味着其他人在找我们要根路径的东西，比如访问baidu.com,我们就会返回一个html文件
    console.log('path', path.resolve(__dirname, 'index.html'))
    const indexContent = await fs.promises.readFile(
      path.resolve(__dirname, 'index.html')
    )
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
    const mainJsContent = await fs.promises.readFile(
      path.resolve(__dirname, 'main.js')
    )
    console.log('mainJsContent', mainJsContent.toString())
    ctx.response.body = mainJsContent
    ctx.response.set('Content-Type', 'text/javascript')
  }
  if (ctx.request.url === '/App.vue') {
    const mainVueContent = await fs.promises.readFile(
      path.resolve(__dirname, 'App.vue')
    )
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
