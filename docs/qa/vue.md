---
outline: deep
---

# vue

## `v-if` 和 `v-show` 的区别

v-if 和 v-show 都可以控制元素的显示和隐藏，但实现方式不同

v-if 是真正的条件渲染，条件为 false 时，元素不会被渲染到DOM中，条件变为 true 时，Vue才会创建对应的 DOM、组件实例并挂载

v-show 是通过 CSS 控制显示隐藏，元素无论条件是否成立都会渲染，只是通过 `display: none` 来控制显示。

一般元素频繁切换，推荐使用 v-show。

如果一个元素很少显示，或者显示时初始化成本比较高可以使用 v-if。

## 为什么 v-if 更影响性能？

准确来说，不能简单说 `v-if` 一定比 `v-show` 性能差。

应该说:

> `v-if` 的切换成本比 `v-show` 高，但是初始渲染成本通常更低。

因为 v-if 切换会涉及：

```
条件改变
 ↓
创建/销毁 VNode
 ↓
创建/销毁 DOM
 ↓
组件创建/卸载
 ↓
生命周期执行
 ↓
DOM 更新
```

而 `v-show`:

```
条件改变
 ↓
修改 display
```

所以短时间内频繁使 v-if 切换，会产生比较高的开销。

但是如果页面初始化时，`v-if = false` 那么这个元素根本不会创建，反而比v-show节省初始渲染成本。

## v-if 和 v-for 可以在同一个元素上使用吗？

> Vue3: 可以但不推荐，而且 Vue3 中二者的优先级发生了变化。

在 Vue3 中 `v-if` 的优先级高于 `v-for`。

这会产生一个问题：

`v-if` 的作用域中访问不到 `v-for` 定义的 `item`。

正确写法：

```js
<template v-for="item in list" :key="item.id">
  <div v-if="item.visible">
    {{ item.name }}
  </div>
</template>
```

更推荐的写法（computed）：

```js
const visibleList = computed(() => {
  return list.filter(item => item.visible)
})
```

相较于 `v-for` 和 `v-if` 的组合使用，更推荐使用 computed 预先得到需要渲染的数据。

## Options API 和 Composition API 的区别

选项式（Options API），用包含多个选项（如：`data`、`methods`、`mounted`）的对象来描述组建的逻辑。选项所定义的属性会暴露在函数内部的 `this` 上，它会只想当前组建的实例。

组合式（Composition API），通过导入的 API 函数（如：ref、onMounted）来描述组件逻辑。在单文件组件中，组合式通常会与 `<script setup>` 搭配使用。

这个 `setup` attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁的使用组合式 API。比如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用。

**其他差别：**

复杂组件：选项式的业务逻辑容易分散（分散于各个选项中），而组合式可以将业务放在一起，更容易维护。

逻辑复用：选项式使用mixins，而组合式使用 “组合式函数”(Composables) 。

TypeScript：组合式提供了更友好的支持。

选项式更适合简单组件和传统 Vue 项目，而组合式更适合复杂业务和大型项目，他最大的优势是可以按照业务逻辑组织代码，并通过组合式函数进行复用。


## Vue 3 响应式和 Vue 2 有什么区别？

Vue2 使用 `Object.defineProperty` 实现响应式，Vue3 使用 `Proxy` 实现响应式。

Vue2的响应式存在一些限制， `Object.defineProperty` 对数组和对象的支持并不好，对于数组 Vue2 采用重写方法的方式来实现响应式，对于对象 Vue2 采用劫持 `get` 和 `set` 的方式来实现响应式，某些情况下无法自动检测进行响应式。

此外 `Object.defineProperty` 还需要进行递归遍历，当对象层级很深时，性能会受到影响。

Vue3 使用 `Proxy` 实现响应式，可以完美监听到数组的变化，同时性能也得到了提升。不必担心数组和对象带来的问题。

## onMounted、watch、computed、方法的区别

`onMounted` 是生命周期挂载的钩子，组件完成挂在后执行。

常用于：

- DOM 操作
- 初始化第三方组件
- 首次请求

`computed` 是计算属性

> 有缓存、以来不变不会重新计算。

如果一个值在多个位置都有使用，那么可以用它，因为只需要计算一次。

但是要注意不要再里面写 `日期时间`、`随机数` 等会变化的值。

`watch` 是监听器，用于监听数据变化。

适用于数据变化后执行副作用。

`普通方法` 每次调用都会执行，没有如 `computed` 的缓存机制。

## ref 和 reactive 的区别

- ref: 可以保存基本类型和对象
- reactive: 只能用于对象类型
- ref 通过 `.value` 访问
- reactive 可以直接访问

- ref 不能解构，reactive 可以
- ref 可以使用 `toRef` 转换成响应式对象
- reactive 不能转换成 ref

## 模板中 ref 为什么不需要 `.value`

在模板中，ref可以自动解包。

```vue
<div> {{ count }} </div>
```

## watch 和 watchEffect

|          | watch | watchEffect |
| -------- | ----- | ----------- |
| 是否明确指定依赖 | 是     | 自动收集        |
| 第一次执行    | 默认不执行 | 默认执行        |
| 获取旧值     | 可以    | 不方便         |
| 使用场景     | 精确监听  | 自动监听        |

## nextTick 是什么？

```js
count.value++

console.log(document.querySelector('#app').innerText)
```

此时 DOM 可能还没更新，log打印出的可能不是想要的值。

可以使用 nextTick 强制更新：

```js
await nextTick()
```

## keep-alive 缓存组件

```vue
<KeepAlive>
  <Component />
</KeepAlive>
```

作用：缓存组件实例，避免组件频繁销毁和重新创建。

相关生命周期：
- onActivated
- onDeactivated

## Teleport

```vue
<Teleport to="body">
  <Dialog />
</Teleport>
```

作用：**将组件的 DOM 渲染到执行位置，但组件逻辑上的父子关系仍然保持。**

这里就是将 `<Dialog />` 组件渲染到 body 下，而不是当前组件下。

常用于

- 模态框
- 通知弹窗


## Vue组件传值

组件传值有以下几种状况：

- 父传子
- 子传父
- 父子双向绑定
- 兄弟组件
- 多层级

### 父传子

通过 `props` 进行传递，父组件在子组件上写属性，子组件通过 `defineProps` 接收。

父组件：

```js
<Child :user="user" />
```

子组件：

```js
const props = defineProps({
    user: Object
})
```

### 子传父

通过 `emit` 触发事件，父组件监听子组件的事件，子组件通过 `defineEmits` 触发事件。

父组件：

```js
<Child @change="handleChange" />
```

子组件：

```js
const emit = defineEmits(['change'])

emit('change', data)
```

### 父子双向绑定

父组件：

```js
<Child v-model="value" />
```

子组件：

```js
const props = defineProps({
    modelValue: String
})

// 或 Vue 3.4+ 写法

const modelValue = defineModel()
```

本质上对应：

```js
<Child :modelValue="value" @update:modelValue="value = $event" />
```

### 兄弟组件

通常不会让兄弟组件直接互相传值，而是将要传的值提升到父组件。

```
兄弟 A
 ↓
父组件
 ↓
兄弟 B
```

复杂一些的项目可以用 `pinia`。

### 多层级

层级较多时，可以使用 provide 和 inject。


高层级组件：

```js
provide('user', user)
```

后代组件：

```js
const user = inject('user')
```

复杂全局状态则推荐 `pinia`。

是不是很像react的 useContext。

## 跨域

浏览器存在同源策略，如果 `协议`、`域名`、`端口` 不同意就属于跨域。

### 解决办法

```
前端：
http://localhost:5173

后端：
http://localhost:8080
```

#### CORS

后端设置

```http
Access-Control-Allow-Origin
```

#### 开发环境 Vite Proxy

在开发环境可以进行中转代理

```js
server: {
    proxy: {
        '/api': {
            target: 'http://localhost:8080'
        }
    }
}
```

浏览器看到的是：

```
localhost:5173/api
```

发送请求时，Vite 通过启动一个后端服务，让后端服务调用 `http://localhost:8080`，再由这个后端服务将数据传回给前端。

本质上就是一个中转代理。

#### Nginx 反向代理

生产环境非常常见：

```
浏览器
 ↓
Nginx
 ↓
前端 / 后端
```

## Cookie 和 Session 的区别

首先要纠正一个常见误区：

> Cookie 和 Session 不是同一个维度的东西。

### Cookie

Cookie 是 **保存在客户端浏览器中的数据**。

例如：

```
Cookie:
sessionId=abc123
```

浏览器请求时会自动携带。

### Session

Session 是 服务器端保存用户绘画数据的一种机制。

```
服务器：

sessionId abc123
       ↓
userId = 10001
role = admin
```

浏览器只保存：

```
sessionId=abc123
```


## Webpack 和 Vite 是干什么的？

它们本质上都是 **前端工程化工具/前端构建工具**

负责：

- 模块处理
- 代码转换
- 资源处理
- 开发服务器
- 打包
- 压缩
- 构建

## Webpack 和 Vite 的区别

它们的主要区别在开发环境上。

Webpack 的运行流程通常是：

```
源码
 ↓
Webpack 打包
 ↓
Bundle
 ↓
浏览器
```

项目越大，启动和更新可能越慢。

Vite 开发环境利用浏览器原生 ES Module：

```
浏览器
 ↓
请求需要的模块
 ↓
Vite 按需提供
```

每次只加载需要使用的部分，不用把整个项目打包。

因此，Vite 开发环境启动速度和 HMR 速度通常更快。

但是生产环境，Vite同样需要构建全部资源。

现在 Vite 生产构建主要基于 Rollup 的生态，并逐渐引入更高性能的底层工具。

## 什么是虚拟DOM

虚拟DOM：使用 JavaScript 对象描述真实 DOM 的一种抽象。

例如：

```html
<div class="box">Hello</div>
```

可以抽象成类似：

```js
{
    type: 'div',
    props: {
        class: 'box'
    },
    children: 'Hello'
}
```

## 虚拟DOM 的作用

**1.抽象DOM**

开发者不需要直接操作真实DOM

**2.Diff**

新旧 VNode比较：

```
旧 VNode
   ↓
Diff
   ↑
新 VNode
```

方便造出真正变化的地方。

**3.跨平台**

VNode 不一定只能生成浏览器DOM

```
VNode
 ↓
Web DOM

VNode
 ↓
Native

VNode
 ↓
其他平台
```

所以虚拟 DOM 不只是为了“快”。

更准确地说：

> 虚拟 DOM 是一种 UI 抽象和更新机制，可以帮助框架进行高效更新，同时提高渲染层的可移植性。


## v-deep 是什么？

Vue 组件中使用 `<style scoped>` 时，表示CSS只作用于当前组件。

例如：

```vue
<style scoped>
.el-button {
    color: red;
}
</style>
```

它无法直接修改子组件内部的样式。

可以使用:

```css
::v-deep(.el-button) {
    color: blue;
}
```

的写法，他的作用是，在 scoped Css 中穿透当前组建的样式作用域，影响子组件内部元素。

常用于：

- 修改第三方组件样式库
- 修改子组件内部样式

## Vue 的 Diff 过程

```
响应式数据发生变化
       ↓
组件重新执行 render
       ↓
生成新的 VNode
       ↓
新旧 VNode Diff
       ↓
找到变化
       ↓
更新真实 DOM
```

Vue3 的 Diff 不是简单的把整个 DOM 从头比较。

它会利用：

```
key
type
patchFlag
静态提升
block tree
```

等进行优化。

## Vue 模板编译过程

大致经历：

```
Template
   ↓
Parse
   ↓
AST
   ↓
Transform
   ↓
Code Generation
   ↓
Render Function
   ↓
VNode
   ↓
真实 DOM
```

最终会生成类似：

```js
function render() {
  return h('div', null, msg)
}
```

Vue 3 内部生成的是更优化的 render code。

## Vue 3 比 Vue 2 做了哪些优化？

- 响应式系统
- 静态提升
- 预字符串化
- Patch Flag
- Block Tree
- 更好的 Tree Shaking
- Composition API

### 响应式系统

Vue2：`Object.defineProperty`

Vue3: `Proxy`

### 静态提升

:::info 静态提升
在 `Vue2` 中，每次渲染会重新创建 `VNode` 节点，即使是静态节点也会被重新创建。这会造成一些不必要的性能损耗。

而在 `Vue3` 中，引入了 `静态提升` 的概念，将静态节点在编译阶段提升为常量，避免了重复创建的开销。
:::
`Vue3` 中，模板编译成 `render` 函数后，可以发现哪些节点是 `静态节点`（纯 Dom 元素：不是组件，没有绑定任何动态属性），发现后会对这类节点**进行提升**（不在render函数中进行创建，而是在render外，这样每次执行 render 时就会减少工作量）。

模板：

```html
<h1>Hello World</h1>
```

Vue2编译后：

```js
render() {
  return createVNode('h1', null, 'Hello World')
}
```

Vue3编译后：

```js
const histed = createVNode('h1', null, 'Hello World')
function render() {
  // 这里可以直接使用 hissted 来渲染
}
```

此外 `静态属性` 也会被提升。

模板：

```html
<!-- 其中 class="user" 是静态属性 -->
<div class="user">
  {{ user.name }}
</div>
```

Vue3编译后：

```js
const hoisted = { class: 'user' }
function render() {
  createVNode('div', hoisted, [])
}
```

### 预字符串化

预字符串化（Pre-stringification）是一种优化技术，用于处理大量静态内容。它可以将静态内容在编译时转换为字符串，以减少运行时的计算和处理。

这在SSR中作用十分明显，组件中大多数东西都是静态元素，只有少数是动态的，如以下代码有大量连续的静态内容：

```html
<div class="menu-bar-container">
  <ul class="menu-bar">
    <li>新闻</li>
    <li>hao123</li>
    <li>地图</li>
    <li>贴吧</li>
    <li>视频</li>
    <li>图片</li>
    <li>网盘</li>
    <li>更多</li>
  </ul>

  <div class="user">
    <span>{{ user.name }}</span>
  </div>
</div>
```

当编译器遇到大量连续的静态内容（如：menu-bar），会直接将其编译为一个普通字符串节点

```js
const _hoisted_2 = _createStaticVNode("<ul class=\"menu-bar\"><li>新闻</li><li>hao123</li><li>地图</li><li>贴吧</li><li>视频</li><li>图片</li><li>网盘</li><li>更多</li></ul>")
```

### Patch Flag

Vue 3 编译器会标记：

```
这个节点只有 class 会变化
这个节点只有 text 会变化
```

尽管通过以上 Vue3 已经跳过了几乎不需要对比的节点，Vue3 还添加了进一步的优化。

Vue2 在对比每一个节点时，并不知道这个节点哪些信息会发生变化，因此这能将所有信息以词对比，而在 Vue3 中它向虚拟 DOM 中添加了一个用于描述节点中可能发生变化的信息标记 PatchFlg。


```js
createVNode('span', null, _toDisplayString(_ctx.user.name), 1 /* TEXT */)
// 其中最后一个参数 1 表示在 span 中 text 的内容时动态的
// 这时在比较 span 元素时不需要关注其他，秩序要对比 text 的内容即可
```

更新时就可以精准处理。

### Block Tree

Vue 3 会对动态节点进行追踪，减少不必要的 Diff。

`Vue2` 在对比新旧树时，并不知道哪些节点是静态的，哪些是动态的，因此只能一层层的比较，这就浪费了大部分的时间对比静态节点。

而 `Block Tree` 解决了新旧两颗树在对比时的效率

他会在根节点中记录后代的节点哪些是动态的，在对比时直接找到根节点，从根节点中去除记录动态节点的数组，对数组进行循环比较。

因为不涉及树中所有节点，因此节省了很多时间。

### 更好的 Tree Shaking

Vue 3 API 模块化程度更高：

```
import { ref } from 'vue'
```

不使用的功能可以被 Tree Shaking 掉。

### 组合式 API（Composition API）

提高复杂业务代码的：

- 复用性
- 可维护性
- TypeScript 支持

## Vue 插槽有哪些

常见有三种：

- 默认插槽
- 具名插槽
- 作用域插槽

### 默认插槽

子组件：

```vue
<slot />
```

父组件：

```vue
<Child>
  Hello
</Child>
```

### 具名插槽

子组件：

```vue
<slot name="header" />
<slot name="footer" />
```

父组件：

```vue
<template #header>
  Header
</template>

<template #footer>
  Footer
</template>
```

### 作用域插槽

子组件向父组件传数据：

```vue
<slot :user="user" />
```

父组件：

```vue
<template #default="{ user }">
  {{ user.name }}
</template>
```

> 子组件提供数据，父组件决定怎么渲染。

## Vue 更新机制

Vue 的响应式更新不是数据一改变就立刻执行 DOM 更新。

例如：

```js
count.value = 1
count.value = 2
count.value = 3
```

Vue 不会：

```
count = 1
count = 2
count = 3
     ↓
调度更新
     ↓
异步执行
     ↓
render
     ↓
DOM 更新
```

而是：

```
count = 1
count = 2
count = 3
     ↓
调度更新
     ↓
异步执行
     ↓
render
     ↓
DOM 更新
```

也就是说，**Vue 会对更新任务进行调度和批处理（batching）**。

## Vue 是怎么实现异步更新的？

Vue内部有一个 **scheduler（调度器）**

当响应式数据发生变化的时候不会立即执行组件更新，而是把更新任务放入队列中。

然后通过：

```js
Promise.resolve().then(...)
```

把刷新任务安排到微任务中执行。

简化理解：

```js
// 更新队列
let queue = []

// 响应式数据更新
function update() {
    queueJob(job)
}

// 将更新任务放入队列
function queueJob(job) {
    queue.push(job)

    // 把刷新任务放到微任务中。
    Promise.resolve().then(flushJobs)
}
```

## 为什么 Vue 要异步更新？

```js
state.count++
state.count++
state.count++
```

如果每次修改都更新DOM，那么就会造成大量的无意义的DOM操作，影响性能，因为用户最终想要看到的只是最后一条结束后画面的样子，中间过程本就看不到。

所以Vue会进行 **批量更新/去重更新**，把多次同步状态修改合并成一次更新。

```
同步代码开始
    ↓
修改 count = 1
    ↓
加入更新队列

修改 count = 2
    ↓
已经有更新任务
    ↓
不重复添加

修改 count = 3
    ↓
继续合并
    ↓
同步代码执行结束
    ↓
Promise 微任务
    ↓
flushJobs
    ↓
组件 render
    ↓
Diff
    ↓
DOM 更新
```

> Vue 的异步更新机制主要是为了批量处理状态变化，通过 scheduler 将更新任务放入队列并在当前同步任务执行完成后统一刷新，从而避免同一个事件循环中多次状态修改导致重复渲染，提高更新效率。

## 详细的Vue异步更新

例子：

```js
count.value = 1
count.value = 2
count.value = 3
```

流程：

```
同步代码开始
↓
count.value = 1
↓
得到影响范围 →  得到当前数据变化所影响的更新任务
↓
更新任务不存在 →  加入将更新任务队列
↓
放入微任务
↓
修改 count = 2
↓
得到影响范围 →  得到当前数据变化所影响的更新任务
↓
更新任务已存在 → 不重复加入
↓
修改 count = 3
↓
得到影响范围 →  得到当前数据变化所影响的更新任务
↓
更新任务已存在 → 不重复加入
↓
同步代码结束
↓
执行微任务 flushJobs
↓
重新 render
↓
获取新旧虚拟 DOM，进行Diff
↓
DOM 更新
```

## Vue Router

### 路由守卫

- 全局守卫
- 路由独享守卫
- 组件守卫
- beforeEach
- beforeResolve
- afterEach

```js
router.beforeEach((to, from) => {})
```

### 路由权限如何实现

```
登录
 ↓
获取用户信息
 ↓
获取角色
 ↓
获取权限
 ↓
动态路由
 ↓
路由守卫
 ↓
判断是否允许访问
```

### Hash 和 History

```
Hash
/#/user

History
/user
```

区别：

- URL
- SEO
- 服务端配置
- 浏览器兼容性
- 部署方式

## 状态管理

### 为甚恶魔需要状态管理

```
    组件A       →       组件B
      ↓                  ↓
    A子组件             B子组件

```

如果A子组件要传值到B子组件，传统的方式需要层层传递，非常麻烦。

所以可以:

```
        Pinia
       ↙     ↘
   组件 A    组件 B
```

### Pinia 和 Vuex 的区别

- API更简单
- Composition API 友好
- TypeScript 支持更好
- 没有 mutations
- store 更灵活

## 盒模型

一个元素由：

```
┌─────────────────────┐
│       margin        │
│  ┌───────────────┐  │
│  │    border     │  │
│  │ ┌───────────┐ │  │
│  │ │  padding  │ │  │
│  │ │ ┌───────┐ │ │  │
│  │ │ │content│ │ │  │
│  │ │ └───────┘ │ │  │
│  │ └───────────┘ │  │
│  └───────────────┘  │
└─────────────────────┘
```

组成：

- content：内容
- padding：内边距
- border：边框
- margin：外边距

### box-sizing

默认：

```css
box-sizing: content-box;
```

此时:

```
实际宽度 = width + padding + border
实际高度 = height + padding + border
```
如果：

```
box-sizing: border-box
```

那么：

```
width = content width + padding + border
height = content height + padding + border
```

实际开发中经常使用 `box-sizing: border-box` 来设置盒模型。

## 防抖和节流

### 防抖

防抖：连续出发时不断重新计时，只有停止触发一段时间后菜执行。

例如：

```
输入框搜索

a
ab
abc
```

只在用户停止输入后才去请求。

适合：

- 搜索
- 表单校验
- 窗口 resize

### 节流

节流：一段时间内最多执行一次。

例如：更新按钮，在请求回来前不允许再次触发。

## var、let、const

| 特性        | `var` | `let`     | `const`   |
| --------- | ----- | --------- | --------- |
| 作用域       | 函数作用域 | 块级作用域     | 块级作用域     |
| 变量提升      | 有     | 有，但不能提前访问 | 有，但不能提前访问 |
| 暂时性死区 TDZ | ❌     | ✅         | ✅         |
| 同一作用域重复声明 | ✅     | ❌         | ❌         |
| 重新赋值      | ✅     | ✅         | ❌         |
| 必须初始化     | ❌     | ❌         | ✅         |


## 闭包

> 闭包：一个函数能够记住并访问它定义时所在作用域中的变量，即使这个函数已经离开了原来的作用域。

最简单的例子就是一个方法A返回另一个方法B，且方法B中含有方法A中创建的变量。

## Promise

## async / await

## 事件循环

## 原型链

## this

## ES6

```
解构
展开运算符
模板字符串
箭头函数
Promise
async/await
Map
Set
Symbol
Iterator
Generator
Proxy
Reflect
```

## 浏览器输入URL发生了什么

## 重排和重绘

## 强缓存和协商缓存


## HTTP

- GET 和 POST
- PUT / PATCH / DELETE
- HTTP 状态码

```
200
201
204

301
302
304

400
401*
403*
404
405

500
502
503
504
```

- 401 → 没有认证 / 登录状态无效
- 403 → 已经认证，但是没有权限

## 前端性能优化

- 代码分割
- 懒加载
- Tree Shaking
- 图片压缩
- WebP
- CDN
- 缓存
- gzip / Brotli
- 预加载
- 预连接
- 减少 JS
- 减少 DOM
- 虚拟列表
- 防抖节流

## 安全

