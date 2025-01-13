# CSS 引入方式

## 样式内联

在 `html` 内通过 `<style>` 标签引入 `css` 样式文件。

```html
<head>
  <style type="text/css">
    .wrapper {
      /* 样式 */
    }
  </style>
</head>
```

## 样式外联

在 `html` 内通过 `<link>` 标签引入 `css` 样式文件。

```html
<head>
  <link rel="stylesheet" type="text/css" href="xx.css">
</head>
```

## 行间样式

在标签上通过 `style` 属性添加样式。

```html
<div style = ""></div>
```

## @import 导入

通过 `@import url` 引入样式文件。

```css
@import url;
```

示例：

```css
@import './styles.css';
@import './transition.scss'
```

## 在 Sass/Scss 中的特殊引入方式

`@use` 是 `Sass` 中的一种引入方式，它用于在 `Sass` 中引入其他 `Sass` 文件。`@use` 旨在代替 `@import` 规则。

`@use` 提供了一种更安全、更模块化的方式来导入其他 Sass 文件中的样式、变量、混合宏（mixins）和函数。它确保了更好的封装性和避免了命名冲突的问题。

**使用 `@use` 的优点**

- **更好的封装性：**`@use` 引入的样式、变量、混合宏和函数都是封装的，不会影响其他文件的样式。
- **避免命名冲突：**由于每个导入的模块都有自己的命名空间，因此可以避免不同模块之间的变量或混合的名称冲突
- **提高性能：**`@use` 只会加载以词被导入的文件，即使在多个地方呗使用，这有助于减少编译时间和输出 CSS 的大小

:::info
`@use` 主要用于导入 `Sass` 文件，而不是 `css` 文件或其他文件类型。

它虽然可以导入 `css` 但这并不推荐。
:::

**使用 `@use` 的语法**

```scss
@use "./base.scss"
```


**避免命名冲突**

> 可以为导入的模块指定一个别名，这样如果两个模块中有相同的变量名，就可以用这个别名区分开来。
> 
> 此外在 `Sass` 中如果用 `@use` 导入的模块，要使用变量时不需要用 `Css` 中的 `var()`包裹。

```scss
@use "./base1.scss" as baseA;
@use "./base2.scss" as baseB;

.wrapper1 {
  color: baseA.$color;
}

.wrapper2 {
  color: baseB.$color;
}
```
