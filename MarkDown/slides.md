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
- vite 的编译结果
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

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## 什么是构建工具？

</div>

### 项目可能具备哪些功能

- typescript: 如果遇到ts文件我们需要使用tsc将typescript代码转换为js代码   
- React/Vue: 安装react-compiler / vue-complier, 将我们写的jsx文件或者.vue文件转换为render函数
- less/sass/postcss/component-style: 我们又需要安装less-loader, sass-loader等一系列编译工具
- 语法降级: babel ---> 将es的新语法转换旧版浏览器可以接受的语法
- 体积优化: uglifyjs ---> 将我们的代码进行压缩变成体积更小性能更高的文件
- ……

我们只需要关心我们写的代码

我们写的代码一变化 ---> 有东西帮我们自动去tsc, react-compiler, less, babel, uglifyjs全部挨个走一遍 ---> js

这个东西就叫做**构建工具**

一个构建工具他到底承担了哪些脏活累活:

- 模块化开发支持: 支持直接从node_modules里引入代码 + 多种模块化支持
- 处理代码兼容性: 比如babel语法降级, less,ts 语法转换(**不是构建工具做的, 构建工具将这些语法对应的处理工具集成进来自动化处理**)
- 提高项目性能: 压缩文件, **代码分割**
- 优化开发体验: 
   - 构建工具会帮你自动监听文件的变化, 当文件变化以后自动帮你调用对应的集成工具进行重新打包, 然后再浏览器重新运行（整个过程叫做热更新, hot replacement）
   - 开发服务器: 跨域的问题, 用react-cli create-react-element vue-cli  解决跨域的问题, 

构建工具他让我们可以不用每次都关心我们的代码在浏览器如何运行, 我们只需要首次给构建工具提供一个配置文件(这个配置文件也不是必须的, 如果你不给他 他会有默认的帮你去处理), 有了这个集成的配置文件以后, 我们就可以在下次需要更新的时候调用一次对应的命令就好了, 如果我们再结合热更新, 我们就更加不需要管任何东西, 这就是构建工具去做的东西, **他让我们不用关心生产的代码也不用关心代码如何在浏览器运行, 只需要关心我们的开发怎么写的爽怎么写就好了**

#### 主流的构建工具
- webpack
- vite
- parcel
- esbuild
- rollup
- grunt
- gulp

<!--

想要知道什么是构建工具首先要知道一个项目可能具备哪些功能

这个代码浏览器是不认识的，需要用tsc把typescript转换为js代码

React/vue  返回一个 div   浏览器不认识  浏览器只认识 html css js 这时候我们需要安装react-compiler / vue-complier

less 浏览器也不认识  安装一系列编译工具

兼容老旧浏览器 语法降级

文件体积越小速率越快  性能越好

还有很多东西

我们每次稍微改一点点东西  都要把这些步骤走一遍，非常麻烦

App.tsx=>tsc=>App.jsx=>React-compalier=>js文件

有一个工具能把这些集成到一起

写react，vue项目本身支持模块化，看一下浏览器支持模块化，浏览器支持esmodule

引入lodash 浏览器报错  不能识别loadsh  只能通过/ ./ ../引入，浏览器不知道node_modules这个东西 

多种模块化 commonjs写法 也可以支持

处理代码兼容性  不是构建工具做的  构建工具将这些集成 自动化处理

打包： 将浏览器不认识的代码，交给构建工具进行编译处理的过程叫打包，打包完成后给我们一个浏览器可以认识的文件

优化开发体验

开发服务器，跨域问题，脚手架传一定的配置可以解决跨域问题  ？？怎么解决  

总结一下什么是构建工具，每次改一点执行顺序也不能错

听的有点懵也没事    只需要知道他做的是个集成的工作

vite 打包生产用到rollup   主流  webpack  vite  esbuild
-->

---
layout: bullets

---

<img v-motion-pop-visible  src="/logo.png" style="zoom:10%;" />

<div class='absolute  top-14  left-28'>

## vite相较于webpack的优势？

</div>

<div  class='overflow-y-scroll h-[400px]   '>

<img   src='/01.png' />


webpack支持多种模块化
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

<img   src='/02.png'   />

<img   src='/03.png' />


</div>




<!--
vite 背靠vue团队  解决了webpack解决不了的问题   

援引官方文档的话

起因: 我们的项目越大 =》工具（webpack）所要处理的js代码就越多 【跟webpack的一个构建过程（工作流程）有关系】

造成的结果: 构建工具需要很长时间才能启动开发服务器 (启动开发服务=>项目跑起来）

运行 yarn start  yarn dev  npm run start  npm run dev

启动一个项目要很长时间  很难受  这是webpack最大的一个缺陷

webpack的编译原理, AST 抽象语法分析的工具 分析出你写的这个js文件有哪些导入和导出操作

前端没办法该 构建工具运行在服务端，  yarn start 构建一个服务器，自己把你的文件改了

-->
