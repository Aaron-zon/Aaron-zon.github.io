---
outline: deep
---

# 入门

## 什么是 React Native

一款基于 React 的跨平台移动应用开发框架。

**同类型产品**
- uniapp x：很多内容是闭源的，而且会受到小程序方面的限制
- Inoic：古早框架，直接将web view 渲染到手机上，没办法利用一些原生功能，现在用的人较少
- tauri：基于rust，目前还处于试验阶段，容易踩坑
- flutter：跨段应用解决方案中最好的一个方案，但是学习成本较高。

**学习前必要的知识**
- React
- TypeScript


## 创建项目

```bash
pnpm create-expo-app@latest
```

**项目初始文件十分复杂可以reset画面，以简化复杂度**

```bash
npm run reset
```

会询问是否将原内容保存至 example，选择 `y` 后，可以看到一个干净的目录。

同时原内容被保存至 exmple 文件夹中，这个文件夹如果不用的话也可以删除。

## 目录结构

```
MyApp

├── app
│   ├── _layout.tsx
│   ├── index.tsx
│   └── about.tsx
│
├── assets
│
├── package.json
│
└── node_modules
```

系统采用了 `文件路由`，app下每一个 .tsx 文件都会自动生成路由。

如当前的目录结构，当访问 `/about` 时，会渲染 `app/about.tsx` 文件的内容。


其中有两个特殊的文件：
- `_layout.tsx`：整个应用的布局文件，所有页面都将在这里进行渲染。
- `index.tsx`：整个应用的入口文件，所有页面的路由都将从这里开始。

## 启动命令

```bash
npm run start
```

如果要在手机上打开，需要先下载 `expo go` 应用，然后扫描二维码，或输入链接。

并且确保服务器与手机在同一个网络中。

如果要在浏览器打开，只需在浏览器中输入 `pn start` 运行成功后提供的网址即可。

## 常用组件

| React Native | Android      | 说明         |
| ------------ | ------------ | ------------ |
| View         | ViewGroup    | 容器组件，用来包裹其他组件 |
| Text         | TextView     | 文本组件，用于显示文字 |
| Image        | ImageView    | 图片组件，用于显示图片 |
| TextInput    | EditText     | 输入框组件，用于输入文本 |
| ScrollView   | ScrollView   | 滚动视图组件，用于显示长列表 |
| FlatList     | RecyclerView | 列表组件，用于显示长列表 |
| Button       | Button       | 按钮组件，用于触发操作 |
| Pressable    |              | 可点击区域 |
| TouchableOpacity |          | 带点击透明效果的按钮 |
| SectionList  |              | 分组列表 |
| SafeAreaView |              | 安全区域 |
| ActivityIndicator |         | 加载动画 |
| Modal        |              | 弹窗 |
| KeyboardAvoidingView |      | 键盘弹出时自动调整布局 |
| StatusBar    |              | 控制手机顶部状态栏 |
| Switch       |              | 开关按钮 |
| ActivityIndicator + RefreshControl | | 常用于下拉刷新 |


## 样式

React Native 没有 XML 标签，而是使用 JavaScript 来定义样式。

需在文件中引入 `StyleSheet`，然后通过 `StyleSheet.create` 方法创建样式对象。

```ts
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text>标题</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
});

```

也可以直接在 Dom 上以双括号 `{{ 样式 }}` 的方式，为 **style** 定义样式。

```js
<View
    style={{
        backgroundColor:'red',
        padding:20
    }}
>
    <Text>标题</Text>
</View>
```

或

## 生态

- 路由（expo-router）
- 状态管理（Zustand / Redux）
- 服务端数据（TanStack Query）
- UI 组件库
- 本地数据存储
- 网络请求
- 权限
- 通知 / 震动 / 蓝牙等原生能力
- 工程化

## tailwind css

https://docs.expo.dev/guides/tailwind/

标准的 Tailwind CSS 仅支持 Web 平台，如果要在 react native 中使用，要用 NativeWind 或 Uniwind 等库。

### 安装

详细请看：https://www.nativewind.dev/docs/getting-started/installation

根据库升级可能会有变化。

**1.安装依赖**

```bash
pnpm add nativewind react-native-reanimated react-native-safe-area-context
pnpm add --save-dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo
```

**2.生成配置文件**

```bash
npx tailwindcss init
```

执行后会在根目录下生成 `tailwind.config.js` 文件。

将下面的内容复制到文件中。

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**content** 表示 tailwind css 要作用于哪些文件，`{}` 内表示文件的后缀，现在这里写的是 App.tsx 和 components 下的 `{js,jsx,ts,tsx}` 文件。但是真正开发时我们想要的可能是作用域整个 src，所以可以改成:


```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```


**3.创建global**

在根下创建 `global.css`，并加入以下内容：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**4.创建babel配置文件**

在根目录创建 `babel.config.js`，并加入以下内容：

```js
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
    };
};
```

**5.创建metro配置文件**

在根目录创建 `metro.config.js`，并加入以下内容：

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './global.css' })
```

注意这里 `metro.config.js` 创建在根路径，配置中 `input` 指向的是 `global.css`，如果位置不对要自行调整配置或 `global.css` 文件位置

**6.导入CSS**

在画面入口中导入 `global.css`，最新版中是 `_layout.tsx`，之前的入口可能是 `App.js`，看真实项目生成的文件结构而定

```js
import "@/global.css";

或

import "./global.css";
```

**7.修改app.json配置**

在根目录找到 `app.json` 文件，找到 `expo.web` 配置

添加 `bundler` 配置：

```json
{
    "expo": {
        "web": {
            "bundler": "metro"
        }
    }
}
```

**问题**

运行可能会出现错误：`Unable to resolve module react-native-css-interop/jsx-runtime`

这是由于使用pnpm无法深度扫描依赖包，导致安装nativewind时漏掉了它的子依赖 `react-native-css-interop`。

**解决方法1：**

我们可以移动 `react-native-css-interop` 到项目根目录的 `package.json` 中，然后重新安装依赖即可。（不过这种方式不推荐，因为也可能有其他包有这个问题，太繁琐。）

```bash
pnpm add react-native-css-interop
```

**解决方法2：**

使用npm，npm可以进行深度扫描不会出现这个问题。

**解决方法3：**

[参考](https://github.com/nativewind/nativewind/issues/894)

如果依旧想使用 pnpm，可以对 pnpm 做一些配置。

`node-linker=hoisted`

在之前的pnpm版本中可以写在根目录 `.npmrc` 中，新版本（v11）需要写在 `pnpm-workspace.yaml` 中。

```yaml
nodeLinker: hoisted
```

随后删除 `node_modules` 目录，重新安装依赖：

```bash
pn i
```







