---
outline: deep
---
# 响应式原理

Vue2 和 Vue3 使用了不同的方式进行响应式处理。

- Vue2 的响应式是基于 `Object.defineProperty` 实现的
- Vue3 的响应式是基于ES6的 `Proxy` 实现的

它们都是通过拦截数据的读取和设置来实现视图自动更新。

## Vue2 的响应式原理

Vue2 利用 `Object.defineProperty` 对对象的每个属性进行劫持，它提供了 `getter` 和 `setter` 两个方法可以分别用于拦截数据的读取和赋值，从而在数据变化的同时通知依赖（如组件视图）更新。

### 依赖收集

在初始化时，每个响应式属性会维护一个“依赖列表”。

类似以下结构（当然会复杂的多）
```
const dep = {
    name: [
        '<span>用户名：{{ name }}</spam>',
        '<input type="text" v-model="name"/>'
    ]
}
```

这样当 `Object.defineProperty` 监听到数据变化时，就可以快速的得到该属性依赖的Dom。

如下述代码中，name被更改后通过 dep['name'] 就可以找到name所依赖的 DOM，这时只要对这部分的 DOM 更新就可以了。

```javascript
const data = {
    name: '小明'
}
const dep = {
    name: [
        '<span>用户名：{{ name }}</spam>',
        '<input type="text" v-model="name"/>'
    ]
}
Object.defineProperty(data, 'name', {
    ...
    set(newValue) { // data.name 属性被修改时触发
        // 通过 dep['name'] 可以获取 data.name 所依赖的 Dom
        // 通过 newValue 可以知道被修改的值
        // 这样就可以对 Dom 进行修改了
    }
})
```

这个响应的过程全程都是 Vue 自动完成的，这使得我们在复杂项目中，可以将关注点放在业务逻辑的处理中，而不是修改视图。

### 局限性

`Object.defineProperty` 也并非是完美的，它又两个大问题。

- 1.新增和删除对象属性无法被监听到。
    - 这里 Vue 提供了 Vue.set 和 delete 来解决这个问题，虽然可以解决，但也让我们需要分出一部分精力来关注对象属性是否存在无法监听的情况。

- 2.对数组内的操作同样无法完美的处理，操作数组内部的值无法被 `Object.defineProperty` 拦截。
    - 这里 Vue 通过原型重写了数组的 push、pop、splice 等方法，保证当使用这些方法操作数组时可以被正常监听。但是数组的操作十分灵活，如果直接使用索引来添加数组值则无法被监听。

```javascript
const data = {
    arr: [1, 2, 3]
}

// 可以触发响应式
data.arr.push(4) // [1, 2, 3, 4]

// 无法触发响应式
data.arr[4] = 5
```

此外还有一些细节问题，比如 `Object.defineProperty` 只能对对象本身进行监听，不能对对象内的属性进行监听。因此 Vue2 使用 `Object.defineProperty` 的同时还进行了 **递归处理** ，为每一个需要监听的属性递归调用 `Object.defineProperty` 。

## Vue3 的响应式原理

Vue3 使用了 ES6 的 `Proxy` 对象来处理响应式。