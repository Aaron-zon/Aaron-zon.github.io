---
outline: deep
---

# CSS 选择器（selector）


## 前言

选择器是 `CSS` 重要的组成部分，它负责匹配目标 `DOM`。让样式正确的渲染到 `DOM` 上。

### 通配符选择器

通配符选择器是 CSS 选择器的一种，它能匹配文档中的所有元素，无论他们的标签名称是什么。

通配符选择器用 `*` 符号表示。

```css
* {
  /* 样式规则 */
}
```

**使用场景**

通配符选择器可以用于为页面上的所有元素添加样式，常用于样式初始化，或与其他选择器组合使用。

例1：取消所有元素的外边距和内边距、设置字体样式等。

```css
* {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
```

例2：与类选择器组合使用，选择 `.container` 下的所有子元素，设置文本颜色为 `#333`。

```css
.container * {
  color: #333;
}
```

### 元素（标签）选择器

元素选择器是通过元素名称来选择 `DOM` 元素。

```css
p {
  /* 样式规则 */
}
```

### 类选择器

类选择器是通过类名（`class` 属性）来选择 `DOM` 元素。

```css
.container {
  /* 样式规则 */
}
```

### ID选择器

类选择器是通过 `id` 属性来选择 `DOM` 元素。

```css
.app {
  /* 样式规则 */
}
```

### 属性选择器

属性选择器可以通过 `DOM` 元素上的属性来选择 `DOM` 元素。

- 基础使用方式

```css
[name = "one"] {
  /* 样式规则 */
}
```
```html
<div name="one">one</div>
```

- `^` ：以什么字符开头

```css
/* 以 on 开头的元素 */
[name ^="ma"] {
  /* 样式规则 */
}
```
```html
<div name="main">main</div>
```
  
- `$` ：以什么字符结尾

```css
[name $="pper"] {
  /* 样式规则 */
}
```
```html
<div name="wrapper">wrapper</div>
```

- `*` ：包含什么字符
  
```css
[name *="sign"] {
  /* 样式规则 */
}
```
```html
<div name="sign">wrapper</div>
<p name="sign">wrapper</p>
<span name="sign">wrapper</span>
```

### 伪类选择器

伪类选择器是用在特定状态下选择元素的。伪类选择器以冒号 `:` 开头。

**常见的伪类选择器**

- `:hover` ：当鼠标悬停在元素上时触发
```css
a:hover {
  color: red;
}
```

- `:active` ：当元素被激活（如点击按钮时）时触发
```css
button:active {
  background-color: #ccc;
}
```

- `:focus` ：当元素获得焦点时触发
```css
input:focus {
  border-color: red;
}
```

- `visited`：用于用户已经访问过的链接
```css
a:visited {
  color: red;
}
```

- `:checked`：用于选中的复选框和单选按钮
```
input:checked + label{
  font-weight: bold;
}
```

### 伪元素选择器

伪元素选择器用于选择元素的特定部分，而不是元素本身。伪元素选择器以两个冒好 `::` 开头（为了与伪类区分开来）。但在需多浏览器中也可以使用单冒号 `:` 兼容旧版本。

**常见的伪元素选择器**

- `::before` ：在元素之前插入内容
- `::after` ：在元素之后插入内容
```css
p::before {
  content: "Note: ";
  font-weight: bold;
}

p::after {
  content: " (end of note)";
  color: gray;
}
```

- `::first-letter`：选择块级元素的第一个字母
```css
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}
```

- `::first-line`：选择块级元素的第一行
```css
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}
```

- `::selection`：选择用户选择的文本
```css
::selection {
  background: yellow;
  color: black;
}
```

- `::placeholder`：选择输入字段中（如：input）的占位符文本
```css
input::placeholder {
  color: gray;
}
```

## CSS 权重

权重由高至低：

- `!important`：Infinity
- `行间样式`：1000
- `id选择器`：100
- `class/属性/伪类`：10
- `元素（标签）/伪元素`：1
- `通配符 *`：0
  
权重的进制为 `256` 进制。

当权重相同时后面的样式会覆盖前面的样式。

