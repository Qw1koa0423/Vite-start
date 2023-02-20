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
Vite: 思维比较前卫而且先进的构建工具 他确实解决了一些webpack解决不了的问题。
目前使用vue-cli去构建vue项目的时候你要写的vue.config.js不再是webpack的配置而是vite的配置(目前只基于浏览器项目)
Vite是Vue团队的官方出品
Vite也支持直接构建react项目, 也支持构建angular项目, svelte项目也支持构建
-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<br>

<div class='absolute  top-14  left-28'>

## 模块

</div>

<div v-click class='overflow-y-scroll max-h-[70%] '>

- 什么是构建工具
- webpack 的一个缺点在哪
- es module 的规范
- vite 是什么
- vite 的基本安装和使用
- vite 编译结果的分析
- vite 的配置文件
- vite 中处理 css, 静态资源
- vite 的插件以及常用插件的使用
- vite 与 Ts 的结合
- vite 生产打包
- vite 构建 React 项目
- vite 的一个构建原理

</div>

---
layout: bullets
clicks: 11

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## 什么是构建工具？

</div>

<div  class='overflow-y-scroll max-h-[400px] '>
<div v-click-hide='7'>

<div v-click='1'>

### 项目可能具备哪些功能

</div>
<div v-click='2' class='group'>

-  typescript: 如果遇到ts文件我们需要使用tsc将typescript代码转换为js代码   
<div class='hidden group-hover:block'>

```typescript
//index.ts
interface IPerson {
  name: string
}
const person: IPerson = {
  name: 'John',
}
//转化为=>
var person = {
    name: 'John'
};
```
</div>

</div>
<div v-click='3' class='group'>

- React/Vue: 安装react-compiler / vue-complier, 将我们写的jsx文件或者.vue文件转换为render函数
<div class='hidden group-hover:block'>

```javascript
//APP.jsx

export default function App() {
  return <div>Hello World</div>
}
//转化为=>
ReactDOM.createRoot(document.getElementById('root') ).render( <App />)
```
</div>
</div>
<div v-click='4' class='group'>

- less/sass/postcss/component-style: 我们又需要安装less-loader, sass-loader等一系列编译工具
<div class='hidden group-hover:block'>

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
</div>
<div v-click='5' >

- 语法降级: babel ---> 将es的新语法转换旧版浏览器可以接受的语法
</div>
<div v-click='6' class='group'>

- 体积优化: uglifyjs ---> 将我们的代码进行压缩变成体积更小性能更高的文件
<div class='hidden group-hover:block'>

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
</div>
</div>
<div v-click-hide='8'>
<div v-click='7' >

我们写的代码一变化 ---> 有东西帮我们自动去tsc, react-compiler, less, babel, uglifyjs全部挨个走一遍 ---> js,我们只需要关心我们写的代码

这个东西就叫做**构建工具**
</div>

</div>
<div v-click-hide='10'>
<div v-click='8' >

### 一个构建工具他到底承担了哪些脏活累活:
</div>
<div v-click='9' class='group' >

- 模块化开发支持: 支持直接从node_modules里引入代码 + 多种模块化支持
<div class='hidden group-hover:block'>

```js
// App.jsx
// 这一段代码最终会到浏览器里去运行
const lodash = require("lodash"); // commonjs 规范
import React from "React"; // es6 module

```
</div>

- 处理代码兼容性: 比如babel语法降级, less,ts 语法转换(**不是构建工具做的, 构建工具将这些语法对应的处理工具集成进来自动化处理**)
- 提高项目性能: 压缩文件, **代码分割**
- 优化开发体验: 
   - 构建工具会帮你自动监听文件的变化, 当文件变化以后自动帮你调用对应的集成工具进行重新打包, 然后再浏览器重新运行（整个过程叫做热更新, hot replacement）
   - 开发服务器: 跨域的问题, 用react-cli create-react-element vue-cli  解决跨域的问题

</div>
</div>
<div v-click-hide='11'>
<div v-click='10' >

构建工具他让我们可以不用每次都关心我们的代码在浏览器如何运行, 我们只需要首次给构建工具提供一个配置文件(这个配置文件也不是必须的, 如果你不给他 他会有默认的帮你去处理), 有了这个集成的配置文件以后, 我们就可以在下次需要更新的时候调用一次对应的命令就好了, 如果我们再结合热更新, 我们就更加不需要管任何东西, 这就是构建工具去做的东西, **他让我们不用关心生产的代码也不用关心代码如何在浏览器运行, 只需要关心我们的开发怎么写的爽怎么写就好了**
</div>
</div>

<div v-click='11' >

#### 主流的构建工具
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
想要知道什么是构建工具首先要知道一个项目可能具备哪些功能

1.TS
2.React/vue
3.less/sass
4.babel
5.体积优化

-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite相较于webpack的优势？

</div>
<div  class='overflow-y-scroll max-h-[400px] '>
<div v-click-hide='3'>
<div v-click='1'>

<img   src='/01.png' />
</div>
<div v-click='2'>

### webpack支持多种模块化

```js
// index.js
// 这一段代码最终会到浏览器里去运行
const lodash = require("lodash"); // commonjs 规范
import Vue from "vue"; // es6 module

// webpack是允许我们这么写的

// webpack的一个转换结果
const lodash = webpack_require("lodash");
const Vue = webpack_require("vue");

```
</div>
</div>
<div v-click='3'>
<img   src='/02.png' />
</div>
<div v-click='4'>
<img   src='/03.png' />
</div>
</div>



<!--
vite 背靠vue团队  解决了webpack解决不了的问题   

援引官方文档的话

起因: 我们的项目越大 =》工具（webpack）所要处理的js代码就越多 【跟webpack的一个构建过程（工作流程）有关系】，如果了解过webpack，webpack支持多种模块化，我这里有两种模块化代码。
webpack的编译原理, AST 抽象语法分析的工具 分析出你写的这个js文件有哪些导入和导出操作

前端没办法改 构建工具运行在服务端，  yarn start 后构建一个服务器，把你的文件改了，换成他自己的一套

因为webpack支持多种模块化, 他一开始必须要统一模块化代码, 所以意味着他需要将所有的依赖全部读一遍

造成的结果: 构建工具需要很长时间才能启动开发服务器 (启动开发服务=>项目跑起来）

启动一个项目要很长时间  很难受  这是webpack最大的一个缺陷

这个改不了，改了就不支持多种模块化

vite会不会直接把webpack干翻, vite是基于es modules的, 侧重点不一样,项目不一定只是跑在浏览器端的， webpack更多的关注兼容性, 而vite关注浏览器端的开发体验,vite不需要把依赖都读一遍，所以不需要很多时间启动开发服务器

我们来看下面两张图，vite是直接开启开发服务器，同时把entry（入口文件）去加载，按需加载模块，webpack是把所有依赖都解析完并且打包，再运行起来，还是那句话，我们的项目越大，启动的时间就越长，我们来到vite这边，他不管项目多大，多臃肿，他都会直接启动开发服务器，来进行按需加载，这边有灰色的，比如说你的路由，你说home页面和一个about页面，你没用到about页面的代码，这个页面就不会被加载，具体他是怎么去实现这一套流程的我们在后面vite的编译原理和esmodule的了解中知道，我们现在只要知道他的启动要比webpack要快，是因为他采取先开启开发服务器，并且不会一次性将所以的依赖去读完，但是webpack必须要把他解析完。 

-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## 什么是vite

</div>

<div  class='overflow-y-scroll max-h-[400px] '>
<div v-click='1'>

### vite脚手架和vite

官方文档：https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project


</div>
<div v-click='2' class='group'>

比如我们敲了`yarn create vite`(vite的脚手架)


```html
1.帮我们全局安装一个东西：create-vite     //比如react脚手架  create react-app  =>create-react-app


2.直接运行这个create-vite bin目录下的一个执行配置
```
<div v-click='3'>

- 开箱即用(out of box): 你不需要做任何额外的配置就可以使用vite来帮你处理构建工作
- 在默认情况下, 我们的esmodule去导入资源的时候, 要么是绝对路径, 要么是相对路径


</div>
</div>
</div>
<!--
在正式讲之前要先搞清楚vite脚手架和vite，官方文档直接用npm create 和yarn create

他其实帮我们搭建的是一套预设的工程，包括vue-cli,cra。
如果光看官网的开始的话可能会以为yarn create构建项目也是vite在做的事情，但是他其实是create vite在做的事情，而不是vite在做的事情，create-vite和vite的关系实际上是create-vite内置了vite

就跟我们cra内置了webpack一样，但是你不能说使用cra创建的项目是webpack去做的事情，所以cra和webpack的关系就等同于create-vite和vite的关系。
所以我们先不用create-vite这个，我们先使用vite

再说一下这个预设：举个现实中的例子，比如我们买房，毛坯房相当于我们的工程，  然后我们要买沙发做装修等等，这些都是要自己去做的，但是你觉得麻烦，你可以直接买开发商弄好的精装修的房，回到这里这时候这个开发商就相当于cra，给我们提供已经精装修的模板。

假如我们自己去搭建一个项目：我们首先要下载vite，reatc，post-css，less，现在create-vite是直接给你一套预设，帮你把这些都下载好了，并且做好了最佳实践，所以我们开发的时候需要自定义的东西很少。

我们现在找一个目录新建一个文件夹

既然我们现在的最佳实践就是node_modules, 那为什么es官方在我们导入非绝对路径和非相对路径的资源的时候不默认帮我们 搜寻node_modules呢？

假如浏览器去做了这个事情，loadsh会被发现，lodash可能又引入了别的库，其他的库又引入了其他的库，那浏览器不知道要发多少请求才能加载下来。

我们看一下浏览器是怎么加载模块的（通过http加载），非常消耗网络资源的性能，common是走这道流程的，以为common运行在服务端，他不是通过网络请求去找的，而是通过读文件去找的。

因为我们的lodash没法加载出来，我们直接引入vite，yarn add vite 这里是有说法的，vite是做代码处理的，把我们的代码构建完成后生成浏览器认识的代码运行，所以我们只在开发环境下用，使用-D

修改一下script，yarn dev 运行一下项目，可以打印出来。不需要我们做任何的处理。
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

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite的编译结果分析

</div>
<div  class='overflow-y-scroll max-h-[400px] '>

```js
import _ from 'lodash'
//=>
import _ from '/node_modules/.vite/lodash'

//找寻依赖的过程是自当前目录依次向上查找的过程, 直到搜寻到根目录或者搜寻到对应依赖为止 

import __vite__cjsImport1_lodash from "/node_modules/.vite/deps/lodash.js?v=e073fc78"
/****************************************************/
- test-vite
  - user
    - node_modules
     - lodash
//打包后路径=>
"/user/node_modules/lodash"  //  ../../user/node_modules/lodash
```
```html
yarn dev =>开发(每次依赖预构建所重新构建的相对路径都是正确的)
生产环境：vite会全权交给一个叫做rollup的库去完成生产环境的打包
缓存=>

React=>commonjs规范导出=>module.exports

```

依赖预构建：首先vite会找到对应的依赖, 然后调用esbuild(对js语法进行处理的一个库), 将其他规范的代码转换成esmodule规范, 然后放到当前目录下的node_modules/.vite/deps, 同时对esmodule规范的各个模块进行统一集成。

他解决了3个问题: 
1. 不同的第三方包会有不同的导出格式(这个是vite没法约束人家的事情)
2. 对路径的处理上可以直接使用.vite/deps, 方便路径重写
3. 叫做网络多包传输的性能问题(也是原生esmodule规范不敢支持node_modules的原因之一), 有了依赖预构建以后无论他有多少的额外export 和import, vite都会尽可能的将他们进行集成最后只生成一个或者几个模块

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
```js
import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps: {
    exclude: ['lodash-es'] //当遇到lodash-es时，不会进行依赖预构建
  }
})
```
</div>
<!--
1.处理过程中如果看到有非绝对路径或者相对路径的引用，他会尝试开启路径补全，直接看一下服务。
2.就是说他会看当前目录下的node_modules有没有对应的依赖，没有的话就会找当前目录的父级目录一直找到根目录为止。
3.打包之后浏览器不认识这个，这个时候他补全会不会变成这样，如果变成这样浏览器找不到因为绝对路径不对了。这里我们区分一下生产和开发。
4.生产环境跟webpack一样兼容特别多的场景，不止支持esmodule，也支持commonjs规范，vite在开发环境不会这么去做一个是缓存问题，实际上vite在考虑另外一个问题的时候就顺便把这个问题解决了
5.module.export 导入第三方库的时候vite不认识，有的包是以commonjs规范导出的，这种情况是库的作者去决定的，vite不能去约束作者，他就项链一个办法叫依赖预构建。
6.第二个解决的是路径问题，他把所有的包都导入.vite目录后就不用去管我是绝对路径还是相对路径
7.假设lodash又依赖了其他模块，并且都是用export导出的，这个时候lodash又要请求他的依赖，又会造成网络传输性能问题。所以打包以后转换成esmodule规范以后同时对esmodule规范各个模块统一集成。
8.安装lodash-es，lodash es的形式。看一下全是esmodule形式，起一个服务看一下跟我们看的不一样，vite把他重写了，把他变成一个函数了。vite发现这个语句之后，他把export { default as a  } from "./a.js"不要了，直接变成函数，那么我们只剩index一个模块了。
9.认识vite第一个配置，新建一个vite.config.js===webpack.config.js,传入参数，启动，看lodash跟我们看的完全一样，看esmodule加载了很多东西出来，所以依赖预构建是vite最重要的。


-->


---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite的配置文件

</div>



<!-- -->

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

<!-- -->