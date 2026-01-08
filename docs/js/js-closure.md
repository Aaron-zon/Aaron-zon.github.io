# 闭包

闭包（Closure）是 JavaScript 中的一个概念，函数“记住”了它出生时的环境，即使离开了那个作用域，也还能继续用。

**何时会出现闭包**：

在一个函数中返回一个函数，且返回的函数中使用了父函数中的变量，这时候就会出现闭包。


```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const fn = outer();
fn(); // 1
fn(); // 2
```

如示例中 `outer函数` 返回了 `inner函数`，且 `inner函数` 中使用了 `outer函数` 中的变量 `count`，这时候就会出现闭包。

## 闭包的作用

闭包并不是一个好的现象，但是在某些场合下，也有其作用

### 1.保存状态

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```
用途：
- 计数器
- 请求次数
- 状态机

### 2.高阶函数和函数式编程基础

```js
function multiply(x) {
  return function (y) {
    return x * y;
  };
}

const double = multiply(2);
double(5); // 10
```

## 闭包的缺点

### 1.内存占用增加

```js
function outer() {
  const bigData = new Array(1000000);
  return function () {
    console.log(bigData.length);
  };
}
```

- bigData 无法被 GC 回收
- 闭包生命周期越长，内存占用越大

### 2.不易理解

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

// 输出：3 3 3
```

### 4.可能被错误使用

```js
function bindClick() {
  const el = document.getElementById('btn');
  el.onclick = () => {
    console.log(el.id);
  };
}
```

如果 DOM 长期存在：

- 闭包引用 DOM
- DOM 无法释放
- 内存泄漏风险

## 什么时候该用闭包？

- 需要保存状态
- 私有变量
- 工厂函数
- 回调 / 事件处理
- 高阶函数