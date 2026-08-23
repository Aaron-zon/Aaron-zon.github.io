# plugin

loader的功能定位是转换代码，而一些其他的操作难以使用loader完成，比如：

- 当webpack生成文件时，顺便多生成一个说明文件;
- 当webpack编译启动时，控制台输出一句话表示webpack启动了;
- 当xxx时，xxx;

这种类似的功能需要把功能嵌入到webpack的编译流程中，而这种事情的实现是依托于 `plugin` 的.

创建plugin文件

![alt text](image-22.png)

要将插件应用到webpack，需要把插件对象配置到webpack的plugin数组中：

![alt text](image-23.png)

**apply函数会在初始化阶段创建好Compiler对象后运行**

compiler对象是 **初始化阶段** 构建的，整个webpack打包期间 **只有一个compiler对象**，后续完成打包工作是compiler对象内部创建的compilation

可以在apply方法中使用一下代码注册钩子函数：

![alt text](image-24.png)

## 事件名称

即要监听的事件名，即钩子名

所有的钩子：https://www.webpackjs.com/api/compiler-hooks/

## 事件类型

这一部分使用的是Tapable API，这个小型的库是一个专门用于钩子函数监听的库。

** 它提供了一些事件类型：**

- tap：注册一个同步的钩子函数，函数运行完毕则表示事件处理结束
- tapAsync：注册一个基于回调的异步钩子函数，函数通过调用一个回调表示事件处理结束
- tapPromise：注册一个基于Promise的异步的钩子函数，函数通过返回的Promise进入已决状态表示事件处理结束

## 处理函数

处理函数有一个事件参数compilation
