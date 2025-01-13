---
outline: deep
---

# CSS 常用样式与单位

## 常用样式

仅写一些项目中常用的使用方式，并不标准，详细查阅

参考[MDN CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)。


| 名称 | 描述 | 常用值/可用值 |
| --- | --- | --- |
| list-style | 用于取消 li 的前缀图形 | none |
| line-height | 行高，常用于让文字垂直具中 | 容器高度 |
| display | 改变元素类型 | inline-block / flex |
| font-weight | 字体粗细 | 100 ~ 900 / normal / lighter / bold / bolder |
| font-size | 字体大小 | px / rem / em |
| text-decoration | 用来去除 a 标签的下划线，也可以用于添加各种文本修饰线 | none |
| text-align | 设置其下元素的水平对其方式 | left / right / center |
| text-indent | 设置首行缩进 | px / em |
| letter-spacing | 设置字符间距 | px / em |
| float | 设置元素浮动 | left / right |
| clear | 设置元素浮动 | none / left / right / both |
| posstion | 设置元素定位 | relative / absolute / fixed |
| z-index | 设置元素层级 | 1 ~ 10000 |
| border | 设置边框 | 1px solid #000 |
| border-radius | 设置圆角 | px / % |
| border-spacing | 设置边框间距 | px / % |
| border-collapse | 设置边框合并 | collapse / separate |
| margin | 设置外边距 | 0 0 0 0 |
| padding | 设置内边距 | 0 0 0 0 |
| vertical-align | 设置元素垂直对齐方式 | top / bottom / middle |
| cursor | 设置鼠标样式 | pointer |
| overflow | 设置元素溢出隐藏 | hidden |
| opactiy | 设置透明度 | 0 ~ 1 |
| outline | 用于取消 input 框点击后的边框样式 | none |
| background-color | 设置背景 | #000 / rgba(0,0,0,0.5) / transparent |
| color | 设置字体颜色 | #000 / rgba(0,0,0,0.5) / transparent |

## px / em / rem / vw / vh

### px

`px` (pixel) 像素，是相对长度单位，PC 端 浏览器中最常用的基本单位。像素 px 是相对心啊时期屏幕分辨率而言的。

:::tip
也就是说如果屏幕分辨率是 2560 * 1080

那么 px 的最大宽度即是屏幕横向最大值 2560

最大高度即是屏幕竖向最大值 1080（因为浏览器还有工具栏导航栏部分因此不可能打到屏幕最大值）。
:::

### em

`em` 是相对长度单位。相对与当前对象内文本字体尺寸（参考物是父元素的 font-size 属性），如果父元素没有设置 `font-size` 属性，那么会再向上寻找直至找到设有 `font-size` 的父元素，如果都没有会使用默认浏览器默认的 `font-size` 属性。

:::tip 小栗子
`font-size: 16px;` 时 `1em = 16px`

`font-size: 32px;` 时 `1em = 32px`
:::

### rem

`rem` 是 CSS3 新增的相对单位，rem 是相对于 HTML根元素的字体大小 （font-size）来计算的长度单位

如果没有设置 HTML 的字体大小，就会以浏览器默认的字体大小为基准（一般为 16px）。

```css
html {
  font-size: 32px;
}

div {
  /* 1rem = 32px */
  width: 1rem;
}
```

### vw / vh 

`vw`、`vh` 是基于视口的单位，它相当于百分比。

- vw：相对于视口宽度的百分比，1vw 等于视口宽度的 1%，1vw 等于 1% 的视口宽度。
  - 假如浏览器的宽度为200px，那么 1vw 就等于 2px（200px/100）
- vh：相对于视口高度的百分比，1vh 等于视口高度的 1%，1vh 等于 1% 的视口高度。
  - 假如浏览器的高度为500px，那么 1vh 就等于 5px（500px/100）
