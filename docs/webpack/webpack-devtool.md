# devtool配置

source map应该仅在 **开发环境** 中作为一中调试手段使用。

source map 不应该在生产环境中使用，source map的文件比较大，不仅会导致额外的网络传输，还容易暴露原始代码。

即使要在生产环境中使用source map，用于调试真实的代码运行，也要做出一些处理规避网络传输和代码暴露。

**webpack中的source map：**

使用webpack编译后的代码难以调试，可以通过devtool配置来优化调试体验

具体配置文档：https://www.webpackjs.com/configuration/devtool/