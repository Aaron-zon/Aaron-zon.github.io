# Tailwind CSS

## 安装

在一个 vite 项目上安装 tailwind css

### 1.下载包

```bash
npm install tailwindcss @tailwindcss/vite
```

### 添加配置

在 vite.config.ts 上添加配置：

```ts
    import { defineConfig } from 'vite'
+   import tailwindcss from '@tailwindcss/vite'

    export default defineConfig({
        plugins: [
+           tailwindcss(),
        ],
    })
```

导入tailwindcss，并在 plugins 中使用。

### 引入

将 tailwindcss 导入到最顶层的css中

```css
@import "tailwindcss";
```

如: React 项目一般会有 index.css。

## 响应式

tailwind 可以通过css实现响应式

```html
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

如这行代码中，w-16 表示一个宽度，md:w-32 表示中尺寸的屏幕上使用 w-32 的样式，lg:w-48 表示大尺寸的屏幕上使用 w-48 的样式。

其中md表示中尺寸屏幕，lg表示大尺寸屏幕。

看起来像是媒体查询吧。


| Breakpoint prefix | Minimum width	  | CSS                              |
|-------------------|-----------------|----------------------------------|
| xs	            | 40rem (640px)   | @media (width < 40rem) { ... }   |
| sm	            | 40rem (640px)	  | @media (width >= 40rem) { ... }  |
| md	            | 48rem (768px)	  | @media (width >= 48rem) { ... }  |
| lg	            | 64rem (1024px)  |	@media (width >= 64rem) { ... }  |
| xl	            | 80rem (1280px)  |	@media (width >= 80rem) { ... }  |
| 2xl	            | 96rem (1536px)  | @media (width >= 96rem) { ... }  |

## 明暗模式

tailwindcss 可以快速实现明暗模式切换。

[明暗模式](https://tailwindcss.com/docs/dark-mode)

首先在引入tailwindcss的css入口覆写明暗模式

```css
@import "tailwindcss";
/* 这里是覆写明暗模式 */
@custom-variant dark (&:where(.dark, .dark *));  
```

在css中暗色模式的样式前添加 `dark:`

```html
<div class="bg-white dark:bg-black">
```

使用时只要在使用暗色模式的标签外添加dark类即可

```html
<html class="dark">
    <body>
        <div class="bg-white dark:bg-black">
        <!-- ... -->
        </div>
    </body>
</html>
```

这里再html上添加了dark类，这样其下的样式就变成暗色模式了。