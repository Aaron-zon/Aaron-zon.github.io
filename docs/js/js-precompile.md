---
outline: deep
---

# Js 预编译

Js 是一门解释性语言，它没有编译过程，主要特点是解释一行执行一行。

**在 Js 运行时会进行三件事：**

- 语法解析：在代码执行前对代码进行通篇检查，以排除一些低级错误（如：使用没有声明的变量等一些会引起错误的语法）
- 预编译：发生在代码执行的前一刻，用来进行作用域解析
- 解释执行：顾名思义就是执行代码

## 预编译

有一句简单的口诀可以描述与预测变量作用域 **变量声明提示，函数整体提升**，在大多数情况下可以通过这段话来确认变量作用域，但却无法解决复杂的问题。

因此还是要详细说明一下什么是预编译。

**预编译可以总结为四个步骤：**

- 1.创建 GO/AO 对象
- 2.找到形参和变量声明，将变量和形参名作为 AO/GO 的属性名，此时值为 undefined
- 3.将实参和形参同一
- 4.在函数体内找到函数声明，将函数体赋予 GO/AO

这里的 GO/AO 分别代表着 GO（Global Object）全局对象 和 AO（Activation Object）活动对象，代表着不同环境下，变量的作用域。

举个栗子：

```js
function f(a) {
  var a = 123;

  function a() {}

  var b = function () {};

  function d() {}
}
f(1);
```

在以上代码的基础，来讲解 f(1) 的预编译的过程。

1. 创建 GO/AO 对象

这里因为是执行函数，因此创建的是 AO 对象，初始时对象内并没有任何属性。

```js
AO = {}
```

2.找到形参和变量声明，将变量和形参名作为 AO/GO 的属性名，此时值为 undefined

代码中的 **变量名** 和 **形参** 只有 a和b，尽管 a 在函数内即是形参，又有变量声明的地方，也只在 AO 中记录一次。

```js
AO = {
  a: undefined,
  b: undefined
}
```

3.将实参和形参同一

形参数只有一个 a，执行函数时 f(1)，因此它的形参是 1

```js
AO = {
  a: 1,
  b: undefined
}
```

4.在函数体内找到函数声明，将函数赋予 GO/AO

在函数中函数声明有 a、d，因此需要将这两个函数添加到 AO，如果属性名在当前AO中则将值替换掉。

**注意：** b因为是变量声明，而不是函数声明因此不再此次赋值行列

```js
AO = {
  a: function a() {},
  b: undefined,
  d: function d() {}
}
```

到此为止，预编译已经完成，作用域链已经生成，代码开始从上到下执行。

```js
function f(a) {
  // a：function a() {}
  // b：undefined
  // d：function d() {}

  var a = 123;

  // a：123
  // b：undefined
  // d：function d() {}

  function a() {}

  // a：123
  // b：undefined
  // d：function d() {}
  
  var b = function () {};

  // a：123
  // b：function () {}
  // d：function d() {}

  function d() {}

  // a：123
  // b：function () {}
  // d：function d() {}
}
f(1);
```