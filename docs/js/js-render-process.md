---
outline: deep
---

# 浏览器渲染过程

浏览器在下载完页面的组件（HTML、CSS、JS、图片等）后，会进行渲染。

## 渲染步骤
### 1.解析 HTML，生成 DOM Tree

- 浏览器受到 HTML 字节流
- 自上而下解析 HTML
- 遇到标签就创建 DOM 节点
- 最终生成 DOM 树

### 2.解析 CSS，生成 CSSOM Tree

- 遇到 `<link>` 或 `<style>`
- 下载 CSS
- 解析 CSS 规则
- 生成 CSSOM（CSS Object Model）

### 3.生成 Render Tree

把 DOM Tree 和 CSSOM Tree 合并，生成 Render Tree

### 4.Layout（回流/布局）

> 计算每个元素的位置和尺寸

此阶段消耗cpu性能

### 5. Paint（重绘）

> 把元素绘制到屏幕上

绘制包括：
- 背景
- 颜色
- 边框
- 文字
- 阴影

📌 只影响外观，不影响布局

### 6.Composite（合成）

- 把不同图层，合成到屏幕上。

## JS 在渲染过程中的角色

### 1.JS 会阻塞DOM解析

```js
<script src="index.js"></script>
```

- HTML 解析暂停
- 下载JS
- 执行JS
- 再继续解析

### 2.async 和 defer 的区别

| 属性        | 下载 | 执行      | 是否阻塞 DOM |
| --------- | -- | ------- | -------- |
| 普通 script | 阻塞 | 立即      | 是        |
| async     | 异步 | 下载完立刻   | 不一定      |
| defer     | 异步 | DOM 完成后 | 否        |

## 回流（Reflow）和 重绘（Repaint）

⚠️ **回流一定导致重绘，但重绘不一定回流**

### 回流（Layout）

触发条件：
- 尺寸改变
- 位置改变
- 添加 / 删除 DOM
- 改变字体大小

👉 **开销大**

### 重绘（Paint）

触发条件：
- 颜色改变
- 背景改变
- 阴影改变

👉 **开销小于回流**

## 性能优化的手段

### 1.减少回流

因为每次回流都很耗性能，因此可以尽量减少回流来做性能优化，具体方式：

- 批量修改DOM，即一次性改完，让浏览器只回流一次。例如：
  - 1.做table行数据插入时，可以将所有要插入的内容放到字符串变量中，最后一次插入，而不是逐行插入
  - 2.做更改元素样式时，不使用style.xxx，因为每次都有可能触发重绘，改为style.cssText一次性设置，或使用class
- 使用 class 代替逐条 style
- 使用 transform 替代 top/left

### 2.减少 CSS 阻塞

- CSS放在 `<head>`
- 精简 CSS
- 合理拆分 CSS

### 3.JS优化

- 使用 `defer`
- 减少同步JS
- 避免频繁读取layout信息（如：offsetHeight），因为读取lyout信息会强制浏览器回流，频繁读取就会导致大量‘强制回流’
  - 此外，如果你需要强制回流的话读取layout信息也是一个办法
