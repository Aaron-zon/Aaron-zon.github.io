---
outline: deep
---
# baseCompile 函数

## 前言

参考 [compileTemplate 函数](https://vue-compiler.iamouyang.cn/template/baseCompile.html)

了解 `compileTemplate` 函数是如何将 `template` 模块编译为 `render` 函数的。

## @vue 下的几个包

- `@vue/compiler-sfc`：用于编译vue的SFC文件，这个包依赖`@vue/compiler-core`和`@vue/compiler-dom`，主要配合 `vue-loader` 或 `@vitejs/plugin-vue` 使用；
- `@vue/compiler-dom`：用于浏览器端的编译，用于处理 `DOM` 相关逻辑；
- `@vue/compiler-core`：vue编译部分的核心，提供编译逻辑，不管是浏览器端编译，还是服务器端编译，都是基于这个包实现；

## `@vue/compiler-sfc` 的 `compileTemplate` 函数



