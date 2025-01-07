# Vue 文件编译

## 前言

参考[Vue3 编译原理揭秘](https://vue-compiler.iamouyang.cn/)。

因为浏览器无法直接使用 `Vue` 文件，所以需要编译为 `JavaScript` 文件。

在 `Webpack` 中，是通过 `vue-loader` 插件实现。而在 `Vite` 中，则是通过 `@vitejs/plugin-vue` 插件实现。

:::info 编译时的入口文件
在 `Vue3` 项目进行编译时，入口文件是 `vite.config.ts`，在这个文件中会引入 `@vitejs/plugin-vue`，并执行方法 `vuePlugin`。

当用户打开画面时，会从 `src/main.ts` 开始加载，没个被加载的文件会调用 `vuePlugin` 中的 `transform` 方法。
:::

## 调试源码

在了解 `Vue` 文件编译时，需要深入查看源码。

可以在 VsCode 中进行 `Debug`，来了解程序执行的过程。

- 1.新建项目，可在 `vite.config.ts` 文件的行号前单击添加断点。

![添加断点](./images/vue-file-compile/1.png)

- 2.添加 JavaScript调试终端

![添加终端](./images/vue-file-compile/2.png)

- 3.在右侧调试栏目下选择 JavaScript调试终端

![设置断点模式](./images/vue-file-compile/3.png)

- 4.在终端输入 `npm run dev` 运行项目（这时会自动跳转到断点上）

![启动项目](./images/vue-file-compile/4.png)

图中是 `vite.config.ts` 调用的 `@vitejs/plugin-vue` 中用来初始化的方法 `vuePlugin`。

![vuePlugin](./images/vue-file-compile/4.png)

## vuePlugin

`vuePlugin` 是 `@vitejs/plugin-vue` 中一个重要的方法，他会在初始阶段获取用于将 .vue 文件转换为 .js 文件的方法。

并在画面加载文件时进行检查（检查是否是 .vue 文件）和转换（将 .vue 文件转换为 .js 文件）。

这里只介绍几个主要的函数和它要做的事情，因此会将原代码进行简化，只提取必要部分。

```ts
function vuePlugin(rawOptions = {}) {
  const options = shallowRef({
    compiler: null,
    // ...
  })

  return {
    name: "vite:vue",
    // ...,
    buildStart() {
      // ...
    },
    // ...,
    transform() {
      // ...
    }
  }
}

```

在 `vuePlugin` 方法中，最终会返回一个对象，对象中 `buildStart`、`transform` 是重要的钩子函数。

- `buildStart` 在服务器启动时调用

- `transform` 在对文件进行解析时调用

## buildStart

`buildStart` 在服务器启动时调用，它的主要作用是获取编译 `.vue文件` 所用的各种方法，即为 `option.value.compiler` 赋值。

在 `vuePlugin` 的最开始我们可以看到，`option.value.compiler` 最初为 null，因此需要在服务器启动的最开始进行赋值。

以下为简化后的 `buildStart` 函数。

```ts
  const compiler = options.value.compiler = options.value.compiler || resolveCompiler(options.value.root);
```

代码中会判断 `options.value.compiler` 是否有值，如果有则继续使用寄存的 `options.value.compiler`，如果没有则调用 `resolveCompiler` 方法，并用结果为 `options.value.compiler` 赋值。

那么 `resolveCompiler` 是如何获取编译 `.vue文件` 所用的各种方法的呢？这些方法又存在哪里呢？

我们可以继续沿着 `resolveCompiler` 向下，以下是简化后的代码。

```ts
function resolveCompiler(root) {
  const compiler = tryResolveCompiler(root) || tryResolveCompiler();
}

function tryResolveCompiler() {
  // 获取项目使用的 Vue 的 package.json 文件
  const vueMeta = tryRequire("vue/package.json", root);
  // 判断使用的是否是 Vue3 以上版本
  if (vueMeta && vueMeta.version.split(".")[0] >= 3) {
    return tryRequire("vue/compiler-sfc", root);
  }
}
```

代码很简单，就是判断使用的 `Vue` 版本，如果是 `Vue3` 及以上版本就引入 `vue/compiler-sfc`，并将内容赋值给 `options.value.compiler`。

也就是说我们要使用的编译 `.vue文件` 的方法来自于 `vue/compiler-sfc`。

## transform

`transform` 方法会在每次对文件进行解析时调用。

当服务器启动时，在控制台中会显示一个路径，这个就不必多说了，当我们访问这个路径，会先访问运行时的入口文件 `src/main.ts`，这时就会触发钩子函数 `transform`。

![transform](./images/vue-file-compile/6.png)

以下是简化后的 `transform` 函数：

```ts
transform(code, id, opt) {
  // ...
  if (如果是vue文件) {
    return transformMain(...)
  } else {
    // 如果不是vue文件（如：.css）
    return transformStyle(...)
  }
}
```

主要判断要解析的文件是否为 `.vue` 文件（如：App.vue），如果是则调用 `transformMain` 方法，否则则可能是样式文件，调用 `transformStyle` 方法。

## transformMain

在解析 `App.vue` 文件时，我们可以根据断点进入 `transformMain`。这个方法主要做了几件事情。

- 1.根据文件中的代码字符串调用 `createDescript` 函数，生成一个 `descriptor` 对象（其实就是将代码字符串拆解，按照script、template、style进行分类方便之后的步骤使用）
- 2.调用 `genScriptCode` 函数，将 `descriptor` 当作参数传入，将原代码的 `<script setup>` 部分编译为浏览器可执行的 js 代码。
- 3.调用 `genTemplateCode` 函数，将 `descriptor` 当作参数传入，将原代码的 `template` 部分编译为 `render` 函数
- 4.调用 `genStyleCode` 函数，将 `descriptor` 当作参数传入，将原代码的 `<style scoped>` 部分编译为 **导入** 语句。**注意** 这里不是编译成可执行的css语句，而是 `import "/src/App.vue?vue&type=style&index=0&scoped=7a7a37b1&lang.css"` 这种的 import 语句，因为导入语句在导入文件时会再次触发 `transform` 这样就会顺利成章的走入 `transformStyle` 的部分了

```ts
async function transformMain(code, filename, options, ...) {
  // 格式化代码字符串，拆解成 descriptor 对象
  const { descriptor, errors } = createDescriptor(filename, code, options)

  // 根据 descriptor 对象的对应部分编译生成浏览器可执行代码
  const { scriptCode } = await genScriptCode(descriptor, ...)
  const { templateCode } = await genTemplateCode(descriptor, ...)
  const { styleCode } = await genStyleCode(descriptor, ...)

  // 将 script、template、style 部分放在一个数组中
  const output = [
    scriptCode,
    templateCode,
    styleCode
  ]
  // 合并 script、template、style 部分代码，并以结束符号分割
  let resolvedCode = output.join('\n')

  // 返回 编译 并 合并 后的代码
  return {
    code: resolvedCode,
    ...
  }
}
```

## createDescriptor

`createDescriptor` 函数主要是将代码字符串拆解成 `descriptor` 对象，这个对象中包含 `script`、`template`、`style` 等部分。

它需要用到的两个主要参数时 `filename` （文件路径名） 和 `source` （文件内源代码），另外 `options` 是一些配置参数，要转化成 `descriptor` 需要用到 `options.value.compiler`，还记得吗，这个就是从 `vue/compiler-sfc`导入的。

以下是简化后的代码

```ts
function createDescriptor(filename, source, {
  root,
  compiler, // vue/compiler-sfc
  ...
}) {
  // 将 source 编译成 descriptor 对象
  const { descriptor } = compiler.parse(source, { filename, ... })

  // 生成文件的 id 标识
  const normalizedPath = normalizePath$1(path.relative(root, filename));
  descriptor.id = getHash(normalizedPath + (isProduction ? source : ""));

  return { descriptor, ... };
}
```

编译 `descriptor` 对象使用了 `vue/compiler-sfc` 中暴露出来的函数 `parse`，这是我们遇到的第一个 Vue3 底层 API，在进入源码后，我们可以找到 `parse` 的定义，以及他的 **参数（SFCParseResult）** 和 **返回值（SFCParseResult）**，通过返回值我们还可以找到 `descriptor` 的接口定义 `SFCDescriptor`。

```
export declare function parse(source: string, options?: SFCParseOptions): SFCParseResult;

export interface SFCParseOptions {
    filename?: string;
    sourceMap?: boolean;
    sourceRoot?: string;
    pad?: boolean | 'line' | 'space';
    ignoreEmpty?: boolean;
    compiler?: TemplateCompiler;
    templateParseOptions?: ParserOptions;
}

export interface SFCParseResult {
    descriptor: SFCDescriptor;
    errors: (CompilerError | SyntaxError)[];
}

export interface SFCDescriptor {
    filename: string;
    source: string;
    template: SFCTemplateBlock | null;
    script: SFCScriptBlock | null;
    scriptSetup: SFCScriptBlock | null;
    styles: SFCStyleBlock[];
    customBlocks: SFCBlock[];
    cssVars: string[];
    slotted: boolean;
    shouldForceReload: (prevImports: Record<string, ImportBinding>) => boolean;
}
```

在 `SFCDescriptor` 中，我们的重点关注对象有三个：

- scriptSetup.content -> script setup 脚本代码
- template.content -> template 模板代码
- styles.content -> style 样式代码

![descriptor](./images/vue-file-compile/7.png)

#### 流程图

![createDescriptor](./images/vue-file-compile/8.png)

## genScriptCode

## genTemplateCode

## genStyleCode

## transformStyle