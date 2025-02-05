---
  outline: deep
---

# Background

## background-image

`background-image` 是 CSS 中用于设置元素背景图像的属性。它允许将 `图像` 应用到 HTML 元素的背景上，同时还可以用来设置 `渐变` 背景。

语法：

```css
selector {
  background-image: url('image.jpg');
}
```

- `url('image.jpg')`：指定图片的路径
- 多个背景图片时以逗号分隔：`background-image: url(), url() ...;`

取值：

- `none`：不设置背景图片
- `url()`：指定图片的路径
- `linear-gradient()`：创建线性渐变背景
- `radial-gradient()`：创建径向渐变背景
- `conic-gradient()`：角度渐变背景

## background-repeat（背景平铺）

控制背景图像是否重复

```css
background-repeat: repeat;      /* （默认）水平&垂直 重复 */
background-repeat: no-repeat;   /* 不重复 */
background-repeat: repeat-x;    /* 水平重复 */
background-repeat: repeat-y;    /* 垂直重复 */
```

## background-size（背景尺寸）

控制背景图片的大小

```css
background-size: auto;          /* （默认）自动调整大小，保持图片的宽高比 */
background-size: cover;         /* 拉伸图片，填充整个元素 */
background-size: contain;       /* 让图片完整显示，可能有空白 */
background-size: 100px 50px;    /* 设定具体宽高 */
background-size: 50% 50%;       /* 设定相对比例 */
```

## background-position（背景位置）

控制背景图片的显示位置

```css
background-position: left top;        /* 左上角 */
background-position: center;          /* 居中 */
background-position: right bottom;    /* 右下角 */
background-position: 50% 50%;         /* x, y 坐标 */
background-position: 10px 20px;       /* 具体像素值 */
```

## background-attachment（背景固定）

控制背景是否随着页面滚动

```css
background-attachment: scroll;  /* 默认，随页面滚动 */
background-attachment: fixed;   /* 背景固定 */
background-attachment: local;   /* 随内容滚动（适用于可滚动容器） */
```

## background-clip（背景剪裁区域）

控制背景绘制的范围

```css
background-clip: border-box;  /* 默认，背景延伸到边框 */
background-clip: padding-box; /* 背景只延伸到内边距（不包含边框） */
background-clip: content-box; /* 仅覆盖内容区域 */
```

## background-origin（背景图片起始位置）

控制背景图片的定位区域

```css
background-origin: border-box;  /* 从边框开始 */
background-origin: padding-box; /* 从内边距开始 */
background-origin: content-box; /* 从内容区域开始 */
```