---
outline: deep
---

# 配置文件

webpack 提供了许多参数，我们可以直接使用命令行来调用。

但为了 **更加灵活、方便** 的使用webpack，我们还可以引入 **配置文件**。

**注意：** 如果 **配置文件** 和 **命令行** 发生了冲突，那么 **以命令行为准**

## webpack配置文件写在哪里？

一般来说webpack的配置文件要放在根目录下，是一个js代码文件，命名为webpack.config.js。

这个文件名是可以改的但需要做一些配置（可以用命令行的--config来指定配置文件）

![alt text](image-4.png)

## webpack配置文件中写什么？

只要最终可以通过CommonJS模块导出一个对象，对象中的各种属性对应不同的webpack配置即可。

**注意：** 只能是通过CommonJS导出，在这里es6的导出方式会报错，这是由于配置文件是在打包的过程中进行读取的，而打包的过程只能在node环境中进行，这时要由node读取配置文件中的内容。

## webpack基本配置

- mode：编译模式（字符串），取值为 `development` 或 `production`，指定编译结果运行的环境，回影响奥webpack对编译结果代码格式的处理。
- entry：入口（字符串），指定入口文件（字符串路径）
- output：出口（字符串），指定编译结果文件（字符串路径）

![alt text](image-5.png)

### 其他配置

- source map：开发环境中使用的一种调试手段，可以方便调试代码，但是会增加编译后的代码体积，所以生产环境中一般不启用。
  - 具体配置文档：https://www.webpackjs.com/configuration/devtool/
- devServe.proxy：中转代理配置，前后端分离希望在同一域上发送 API 请求时使用
  - 具体配置文档：https://www.webpackjs.com/configuration/dev-server/#devserverproxy

