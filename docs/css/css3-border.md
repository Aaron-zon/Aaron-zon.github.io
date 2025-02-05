---
  outline: deep
---

# Border

## border-radius

圆角，根据元素宽高像素进行改变

```css
border-radius: 10px 5px 5px 10px;   /* 左上 右上 右下 左下 */
border-radius: 10px 5px 10px;       /* 左上 右上坐下 右下 */
border-radius: 10px 5px;            /* 上 下 */
border-radius: 10px;                /* 上下左右 */
```

## border-image

`border-image` 边框背景，可拆分为 `source` `slice` `width` `outset` `repeat`

### border-image-source

填充物

```css
border-image-source: url(image.png); /* 填充图片 */
border-image-source: linear-gradient(颜色1, 颜色2); /* 填充渐变色 */
```

### border-image-slice

`border-image-slice` 属性将使用 `source` 引入的填充物划分为多个区域。这些区域共通组成了边框图像。

### border-image-width

`border-image-width` 属性指定了 边界图像 (border image) 的宽度

### border-image-outset

`border-image-outset` 属性定义边框图像可超出边框盒的大小。

### border-image-repeat

`border-image-repeat` 定义图片如何填充边框。或为单个值，设置所有的边框；或为两个值，分别设置水平与垂直的边框。
