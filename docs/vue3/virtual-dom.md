---
outline: deep
---

# 什么是虚拟 DOM？

虚拟 DOM 是一种用于描述真实 DOM 的抽象语法树，它允许我们以一种声明式的方式来描述真实 DOM 的结构，从而实现对真实 DOM 的更新。

在 Vue 中，虚拟 DOM 是一个 JavaScript 对象，它描述了真实 DOM 的结构，包括标签名（tag）、属性（attrs）、子元素（children）等。当数据发生变化时，Vue 会根据虚拟 DOM 的变化来更新真实 DOM。

真实DOM结构：

```html
<div id="app">
    <p class="p">节点内容</p>
    <h3>{{ foo }}</h3>
</div>
```

虚拟DOM：
```javascript
{
    tag: 'div',
    attrs: {
        id: 'app'
    },
    children: [
        {
            tag: 'p',
            attrs: {
                class: 'p'
            },
            text: '节点内容'
        },
        {
            tag: 'h3',
            ...
        }
    ]
}
```

创建 `虚拟DOM` 可以更好的控制页面视图的渲染，当触发响应式时，`diff算法` 会对比新旧虚拟DOM，得出需要修改的最小单位，从而在视图的更新时，实现减少 `dom` 操作，提高性能。

## 为什么需要虚拟 DOM ？

操作 `DOM` 的代价是十分昂贵的，js 和 DOM 是两种东西，当使用 js 操作 DOM 时，需要两者交互。

操作DOM会导致重排和重绘。

### Dom 和 js 的关系

DOM 是独立于语言的，用于操作 xml 和 HTML 文档的程序接口，在浏览器中主要用于和 html 打交道。

而 js 是浏览器中用来调用接口的语言，它无法真正改变 DOM，而是通过使用 Dom API来访问 html文档中的数据。

在 IE 



