# 介绍

Vite是用于替代webpack的打包工具，他比webpack更快。

**Vite主要由两部分构成：**

- 一个开发服务器，它基于原生ES模块提供了丰富的内建功能，如：速度快到惊人的模块热更新。
- 一套构建指令，它使用Rollup打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

**分为以下模块：**

- 1. 什么是构建工具
- 2. 相比于webpack的优势
- 3. es module的规范
- 4. vite到底是什么
- 5. vite的安装与使用
- 6. vite的编译结果
- 7. vite的编译结果分析
- 8. vite的配置文件
- 9. vite处理css，静态资源怎么去做
- 10. vite的插件以及常用插件的使用
- 11. vite与ts的结合
- 12. vite构建react项目、svelte项目、vue3项目
- 13. vite构建原理

## 什么是构建工具

浏览器只认识html、css、js

在企业级开发中可能还会使用其他技术，这时需要构建工具将这些内容转换成浏览器可以使用的内容，同时可以对要展示的资源进行优化。

如：

- typescript：需要将tsc将ts文件内容转换为js
- React / Vue：需要react-compiler / vue-complier 处理React / Vue 中的模板(.jsx/.vue)
- 预处理css：less/scss/postcss/component-style等预处理css需要使用其对应的less-loader，sass-loader等一系列编译工具
- 语法降级：babel ---》 将es的新语法降级为旧版浏览器可以接受的语法
- 体积优化：uglifyjs ---》将我们的代码进行压缩变得体积更小
- 模块合并：将多个文件整合到一个文件中，减少资源请求
- 代码分割：提取多个页面的公共代码，提起首屏不需要执行部分代码让其异步加载。
- ...