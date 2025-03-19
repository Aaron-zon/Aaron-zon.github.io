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

- 操作 `DOM` 的代价是十分昂贵的，js 和 DOM 是两种东西，当使用 js 操作 DOM 时，需要两者交互。

- 操作DOM会导致重排和重绘。

## Dom 和 js 的关系

DOM 是独立于语言的，用于操作 xml 和 HTML 文档的程序接口，在浏览器中主要用于和 html 打交道。

而 js 是浏览器中用来调用接口的语言，它无法真正改变 DOM，而是通过使用 Dom API来访问 html文档中的数据。

这样当一次操作会更新多个 DOM 节点时，如果一次次去调用 Dom API 将会十分消耗不必要的性能。

举一个栗子：

用传统的 `js` 操作 `DOM` 时，浏览器会从构建 `DOM` 树开始从头到尾执行一遍流程。

在一次操作中，需要更新10个 `DOM` 节点，但浏览器没那么只能，收到第一个更新 `DOM` 请求后，并不知道后续还有9次更新，因此会马上执行流程，最终执行了10次此流程

## 浏览器中 Dom 和 js 的处理位置

- Chrome
  - js：使用 V8 引擎解析 js 代码
  - Dom：使用 Webkit 中的 webcore 进行渲染
- Safari
  - js：使用 SquirelFish 引擎解析 js 代码
  - Dom：使用 Webkit 中的 webcore 进行渲染
- Firefox
  - js：TraceMonkey
  - Dom：Gecko

## 什么是重排和重绘

在浏览器渲染页面的过程中，重排（Reflow） 和 重绘（Repaint） 是影响页面性能的重要概念。

### 1.重排

当 DOM 的变化影响了元素的几何属性（宽高、位置、边距等），浏览器需要重新计算元素的几何属性，并重新渲染页面。

**触发重排的情况 ：**

- 添加或删除可见的 DOM 元素
- 修改元素的尺寸（`width`、`height`、`padding`、`margin`、`border`）
- 修改元素位置（`top`、`left`、`bottom`、`right`）
- 修改 `display`、`position`、`float` 这些影响布局的CSS属性
- 读取某些属性，如（`offsetWidth`、`offsetHeight`、`getBoundingClientReact()`），浏览器会废了获取最新值而触发一次强制重排

**重排的代价**

重排是性能开销较大的操作，因为它会影响页面的 **所有子元素**，尤其是对于复杂页面，大量的重排会降低性能，导致卡顿。

### 2.重绘

重绘是指当元素的样式（如颜色、背景、阴影等）发生变化时，浏览器会重新绘制该元素，但不会影响其布局。

**触发重绘的情况：**

- 修改了 `color`、`background-color`、`visibility`、`box-shadow` 等不影响布局的属性
- 修改了 `outline` （不会影响布局，但会导致重绘）

**重绘的代价**

重绘的性能开销比重排小，但如果页面上有大量重绘操作，仍会影响渲染性能。
  
### 3.如何减少重排和重绘

1.减少不必要的DOM操作

- 避免拼饭修改样式

```js
// 错误示范
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';

// 优化：使用 `classList.add()` 一次性修改
element.classList.add('new-style');
```

- 使用 `documentFragment` 批量操作 DOM

```js
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.innerText = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment); // 一次性渲染到 DOM，减少重排
```

2.避免拼饭查询和修改布局

读取布局信息（如：`offsetWidth`）会触发重拍，应避免在循环中多此读取和修改

```js
// ❌ 低效：每次修改都会触发重排
for (let i = 0; i < items.length; i++) {
    items[i].style.height = items[i].offsetHeight + 'px';
}

// ✅ 高效：先计算，再批量应用
const height = items[0].offsetHeight;
for (let i = 0; i < items.length; i++) {
    items[i].style.height = height + 'px';
}
```

3.使用 `will-change` 提前优化

对于可能变化的元素，使用 `will-change` 让浏览器提前优化：

```css
.animated {
    will-change: transform, opacity;
}
```

4.使用 `requestAnimationFrame`

避免在 `setTimeout` 或 `setInterval` 里更新 DOM，改用 `requestAnimationFrame`：

```js
requestAnimationFrame(() => {
    element.style.transform = 'translateX(100px)';
});
```

## DOM 渲染过程

浏览器下载完构成页面所需的元素后（HTML、CSS、JS、图片等），会进行以下内容完成页面渲染

- 1.解释HTML，构建Dom树
- 2.解析CSS，生成CSS规则树（cssom）
- 3.合并Dom树和CSS规则树，生成render树（渲染树）
- 4.布局render树，负责各元素尺寸、位置的计算（此阶段小号cpu性能）
- 5.绘制render树，绘制页面信息
- 6.浏览器将各层信息发送给GPU，GPU将各层合成

### 4.总结

| 操作 | 影响 | 触发方式 | 影响范围 | 性能损耗 |
| - | - | - | - | - |
| 重排 | 布局计算 | 改变尺寸、位置、结构 | 影响整个页面（或局部） | 高 |
| 重绘 | 视觉更新 | 改变颜色、背景、阴影 | 仅影响该元素 | 低 |

为了提高性能，应该 减少重排、优化重绘，避免不必要的 DOM 操作，尽可能使用批量更新和 GPU 加速技术（如 transform 和 opacity）。