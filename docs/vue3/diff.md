---
outline: deep
---

# Diff 算法

diff 算法是一种对比算法，它是 vdom 最核心、最关键的部分。单纯的 虚拟DOM 并不会使运行效率超过修改真实DOM，但搭配 `diff算法` 可以使修改 `真实DOM` 的影响范围减少，从而提高性能。

vue 的 diff算法 会对比 `新旧虚拟DOM`，找出哪些 `虚拟节点` 更改了，并只更新这些经过 `虚拟节点` 对应的 `真实节点`，而不影响其他数据没有发生变化的节点，实现 `精准` 更新DOM，进而提高性能。

> diff 即 对比，是一个广泛的概念，不是 vue、react 特有的。如 linux diff命令，git diff 等。

**举个栗子：**

真实DOM

```html
<ul id="list">
  <li>js</li>
  <li>java</li>
  <li>php</li>
</ul>
```

虚拟DOM

```js
let oldDOM = {
  tagName: 'ul',
  props: {
    id: 'list',
  },
  children: [
    {
      tagName: 'li', props: { class: 'item' }, children: ['js']
    },
    {
      tagName: 'li', props: { class: 'item' }, children: ['java']
    },
    {
      tagName: 'li', props: { class: 'item' }, children: ['php']
    },
  ]
}
```

当需要修改一个 `li` 标签的文本时：

```html
<ul id="list">
  <li>js</li>
  <li>java</li>
  <li>python</li>
</ul>
```

这时会生成新的 `虚拟DOM`：

```js
let newDOM = {
  tagName: 'ul',
  props: {
    id: 'list',
  },
  children: [
    {
      tagName: 'li', props: { class: 'item' }, children: ['js']
    },
    {
      tagName: 'li', props: { class: 'item' }, children: ['java']
    },
    {
      tagName: 'li', props: { class: 'item' }, children: ['python']
    },
  ]
}
```

此时如果直接拿 `新虚拟DOM` 去渲染 `真实DOM` 将会完全替换掉当前页面，触发大范围的重排。

这显然不是我们想要的，我们需要找到最小范围的更新，这就需要 `diff算法`。

## Diff 算法原理

vue 中的 diff算法有以下特点，让其 **时间复杂度可以降低为 O(n)**

- 只比较同一层级，不跨级比较
- tag 不相同，直接删除掉重建，不再深度比较
- tag 和 key 两者都相同，则认为是相同节点，不再深度比较
